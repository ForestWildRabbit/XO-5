from typing import Sequence

from app.game.models import GameModel
from app.game.schemas import GameCreateSchema

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def create_game(db: AsyncSession, game_data: GameCreateSchema) -> GameModel:
    game = GameModel(**game_data.dict())
    db.add(game)
    await db.commit()
    await db.refresh(game)
    return game


async def get_game(db: AsyncSession, game_id: int) -> GameModel | None:
    result = await db.execute(select(GameModel).where(GameModel.id == game_id))
    return result.scalar_one_or_none()


async def get_all_games(db: AsyncSession) -> Sequence[GameModel]:
    result = await db.execute(select(GameModel))
    return result.scalars().all()
