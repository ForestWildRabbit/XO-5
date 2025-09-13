

from fastapi import APIRouter, Depends

from app.auth.schemas import AuthTokensSchema, AccessTokenSchema
from app.auth.utils import create_access_token, create_refresh_token, fetch_jwt_from_header, decode_refresh_token
from app.auth.validation import validate_auth_user
from app.user.schemas import UserReadSchema

auth_router = APIRouter(
    prefix="/auth",
    tags=['Auth']
)


@auth_router.post("/login", response_model=AuthTokensSchema)
async def login(user: UserReadSchema = Depends(validate_auth_user)):
    access_token = create_access_token(user.uuid)
    refresh_token = create_refresh_token(user.uuid)
    auth_tokens = AuthTokensSchema(access_token=access_token, refresh_token=refresh_token)
    return auth_tokens


@auth_router.post("/refresh", response_model=AccessTokenSchema)
async def refresh(auth_token: str = Depends(fetch_jwt_from_header)):
    payload = decode_refresh_token(auth_token)
    user_uuid = payload['sub']
    access_token = AccessTokenSchema(access_token=create_access_token(user_uuid))
    return access_token


