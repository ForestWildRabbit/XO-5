from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.user.models import UserModel
from app.user.schemas import UserCreateSchema, UserLoginSchema


async def create_user(db: AsyncSession, user_data: UserCreateSchema) -> UserModel:
    user = UserModel(**user_data.dict())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def get_user_by_username(db: AsyncSession, user: UserLoginSchema) -> UserModel:
    if user.username is None:
        raise HTTPException(status_code=400, detail="Username is not provided")

    query = (select(UserModel).where(UserModel.username == user.username))

    result = await db.execute(query)
    return result.scalars().first()


async def get_user_by_uuid(db: AsyncSession, user_uuid: UUID) -> UserModel:
    query = (select(UserModel).where(UserModel.uuid == user_uuid))

    result = await db.execute(query)
    return result.scalars().first()

