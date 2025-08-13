from app.schemas.base import BaseSchema


class GameCreateSchema(BaseSchema):
    moves_number: int = 0
    x_player: str = ''
    o_player: str = ''
    is_finished: bool = False


class GameReadSchema(BaseSchema):
    id: int
    x_player: str
    o_player: str
    moves_number: int
    is_finished: bool

