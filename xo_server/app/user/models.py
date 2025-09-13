from sqlalchemy import Uuid, text, String
from uuid import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.models import Base


class UserModel(Base):
    __tablename__ = 'users'

    uuid: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=text("gen_random_uuid()"))
    username: Mapped[str] = mapped_column(String(20), index=True, unique=True)
    password: Mapped[bytes]
