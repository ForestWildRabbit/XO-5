from fastapi import WebSocket
from sqlalchemy.ext.asyncio import AsyncSession


class ConnectionManager:
    def __init__(self):
        self.room_connections: dict[int, set[WebSocket]] = dict()

    async def connect(self, room_id: int, websocket: WebSocket, session: AsyncSession):
        await websocket.accept()
        if room_id not in self.room_connections:
            self.room_connections[room_id] = {websocket, }
        else:
            self.room_connections[room_id].add(websocket)
        await self.broadcast({
            'type': 'connection',
            'data': f'New client joined',
        }, room_id, websocket, session=session)

    def disconnect(self, websocket: WebSocket, room_id: int):
        if room_id not in self.room_connections:
            return -1
        self.room_connections[room_id].remove(websocket)

    async def broadcast(self, data: dict, room_id: int, websocket: WebSocket, session: AsyncSession):
        if room_id not in self.room_connections:
            return -1
        for connection in self.room_connections[room_id]:
            if connection != websocket:  # do not send back
                await connection.send_json(data)


