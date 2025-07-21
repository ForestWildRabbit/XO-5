from app.db.models import Base
from sqlalchemy.orm import Mapped, mapped_column


class GameModel(Base):
    __tablename__ = 'game'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    moves_number: Mapped[int] = mapped_column(default=0)
    is_finished: Mapped[bool] = mapped_column(default=False)
