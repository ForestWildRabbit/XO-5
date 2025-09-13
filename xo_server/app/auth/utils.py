from datetime import datetime
from uuid import UUID

from fastapi import HTTPException, Request

import bcrypt
import jwt

from app.core.config import SECRET_KEY, AuthJWT

INVALID_JWT_TYPE_EXCEPTION = HTTPException(status_code=401, detail="Invalid jwt type")


def validate_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password)


def create_access_token(user_uuid: UUID) -> str:
    access_token = encode_jwt(
        payload={'type': AuthJWT.access_token_type,
                 'sub': str(user_uuid),
                 'exp': datetime.utcnow() + AuthJWT.access_token_expires_in,
                 'iat': datetime.utcnow(),
                 },
        secret_key=SECRET_KEY,
        algorithm='HS256'
    )
    return access_token


def create_refresh_token(user_uuid: UUID) -> str:
    refresh_token = encode_jwt(
        payload={'type': AuthJWT.refresh_token_type,
                 'sub': str(user_uuid),
                 'exp': datetime.utcnow() + AuthJWT.refresh_token_expires_in,
                 'iat': datetime.utcnow(),
                 },
        secret_key=SECRET_KEY,
        algorithm='HS256'
    )
    return refresh_token


def encode_jwt(payload: dict, secret_key: str, algorithm: str = 'HS256') -> str:
    encoded = jwt.encode(payload=payload, key=secret_key, algorithm=algorithm)
    return encoded


def decode_jwt(token: str, secret_key: str, algorithm: str = 'HS256'):
    try:
        decoded = jwt.decode(token, secret_key, algorithms=[algorithm])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Invalid JWT')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid JWT')
    return decoded


def fetch_jwt_from_header(request: Request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    parts = auth_header.split()
    if len(parts) != 2 or parts[0] != "Bearer":
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return parts[1]


def decode_access_token(token: str):
    payload = decode_jwt(token, secret_key=SECRET_KEY, algorithm='HS256')
    print(payload)
    if payload['type'] != AuthJWT.access_token_type:
        raise INVALID_JWT_TYPE_EXCEPTION
    return payload


def decode_refresh_token(token: str):
    payload = decode_jwt(token, secret_key=SECRET_KEY, algorithm='HS256')
    if payload['type'] != AuthJWT.refresh_token_type:
        raise INVALID_JWT_TYPE_EXCEPTION
    return payload




