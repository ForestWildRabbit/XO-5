from fastapi import APIRouter, Depends
from fastapi import HTTPException, WebSocket

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.websockets import WebSocketDisconnect

from app.db.sessions import get_async_session
from app.game.schemas import GameCreateSchema, GameReadSchema
from app.game.crud import create_game, get_game, get_all_games
from app.websocket.managers import ConnectionManager

game_router = APIRouter(
    prefix='/game',
    tags=['Games'],
)

manager = ConnectionManager()


@game_router.websocket("/connect/{room_id}")
async def websocket_game(websocket: WebSocket, room_id: int, session: AsyncSession = Depends(get_async_session)):
    await manager.connect(room_id, websocket, session=session)
    try:
        await manager.broadcast({
            'type': 'connection',
            'data': f'New client joined the room {room_id}',
        }, room_id, websocket, session=session)

        while True:
            data = await websocket.receive_json()

            await manager.broadcast(data, room_id, websocket, session=session)

    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)


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
