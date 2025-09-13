from uuid import UUID

import bcrypt
from pydantic import Field, field_validator

from app.schemas.base import BaseSchema


def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


class UserCreateSchema(BaseSchema):
    username: str = Field(pattern="^[A-Za-z0-9_-]{4,20}$")
    password: str

    @field_validator('password')
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")

        if not any(c.isalpha() for c in value):
            raise ValueError("Password must contain at least one letter")

        if not any(c.isdigit() for c in value):
            raise ValueError("Password must contain at least one number")

        if not any(c in "!@#$%^&()_+-={}[]\\|:;'<>,.?/" for c in value):
            raise ValueError("Password must contain at least one special character")

        return hash_password(value)


class UserLoginSchema(BaseSchema):
    username: str
    password: str


class UserReadSchema(BaseSchema):
    uuid: UUID
    username: str

