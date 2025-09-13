from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.validation import fetch_user_from_jwt
from app.db.sessions import get_async_session
from app.user.crud import create_user
from app.user.schemas import UserCreateSchema, UserReadSchema

user_router = APIRouter(
    prefix='/user',
    tags=['Users'],
)


@user_router.post('/', response_model=UserReadSchema)
async def create_new_user(user: UserCreateSchema, db: AsyncSession = Depends(get_async_session)):
    try:
        user = await create_user(db, user)
    except IntegrityError:
        raise HTTPException(status_code=400, detail='Username must be unique')
    return user


@user_router.post('/info', response_model=UserReadSchema)
async def user_info(user: UserReadSchema = Depends(fetch_user_from_jwt)):
    return user
