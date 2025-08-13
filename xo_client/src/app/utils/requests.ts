import {CellType} from "@/app/store/FieldStore";

export const send_move = (websocket: WebSocket | null, move: CellType) => {
    if (websocket === null){
        return -1;
    }
    if (websocket.readyState === WebSocket.OPEN){
        websocket.send(JSON.stringify({
            type: 'move',
            move: move,
        }));
    }
}