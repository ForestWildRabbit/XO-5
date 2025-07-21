from fastapi import APIRouter, Depends
from fastapi import HTTPException

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.sessions import get_async_session
from app.game.schemas import GameCreateSchema, GameReadSchema
from app.game.crud import create_game, get_game, get_all_games

game_router = APIRouter(
    prefix='/game',
    tags=['Games'],
)


@game_router.post("/", response_model=GameReadSchema)
async def create_new_game(game: GameCreateSchema, db: AsyncSession = Depends(get_async_session)):
    return await create_game(db, game)


@game_router.get("/{game_id}", response_model=GameReadSchema)
async def read_game(game_id: int, db: AsyncSession = Depends(get_async_session)):
    game = await get_game(db, game_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return game


@game_router.get("/", response_model=list[GameReadSchema])
async def list_games(db: AsyncSession = Depends(get_async_session)):
    return await get_all_games(db)

