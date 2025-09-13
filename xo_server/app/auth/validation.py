from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.utils import validate_password, fetch_jwt_from_header, decode_access_token
from app.db.sessions import get_async_session
from app.user.crud import get_user_by_username, get_user_by_uuid
from app.user.schemas import UserLoginSchema, UserReadSchema

WRONG_AUTH_EXCEPTION = HTTPException(status_code=401, detail="Wrong username or password")


async def validate_auth_user(user_data: UserLoginSchema,
                             db: AsyncSession = Depends(get_async_session)) -> UserReadSchema:
    user = await get_user_by_username(db, user_data)
    if user is None:
        raise WRONG_AUTH_EXCEPTION
    if not validate_password(user_data.password, user.password):
        raise WRONG_AUTH_EXCEPTION

    return user


async def fetch_user_from_jwt(auth_token: str = Depends(fetch_jwt_from_header),
                              db: AsyncSession = Depends(get_async_session)):
    payload = decode_access_token(auth_token)
    user_uuid = payload['sub']
    return await get_user_by_uuid(db, user_uuid)
