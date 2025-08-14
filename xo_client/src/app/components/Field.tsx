import {CellType, useFieldStore} from "@/app/store/FieldStore";
import CellRow from "@/app/components/CellRow";
import {useEffect} from "react";
import CustomWebSocket, {reconnect_delay} from "@/app/utils/socket";
import {useSocketStore} from "@/app/store/SocketStore";
import {domainName} from "@/app/utils/requests";

const Field = () => {
    const field: string[][] = useFieldStore(state => state.field);
    const updateSocket = useSocketStore(state => state.updateSocket);
    const updateCell = useFieldStore(state => state.updateCell);
    const game_id = 1;

    useEffect(() => {
        const gameWebsocket: WebSocket = new CustomWebSocket(
            `wss://${domainName}/api/game/connect/${game_id}`, reconnect_delay).get_websocket();
        gameWebsocket.onmessage = (event) => {
            if (event.type === 'message') {
                const response = JSON.parse(event.data);
                if (response.type === 'move'){
                    const move: CellType = response.move;
                    updateCell(...move);
                }
                console.log(response);
                console.log(event);
            }
        }
        updateSocket(gameWebsocket);

    }, [])

    return (
        <div className={'cell_row'}>
            {
                field.map((array, i) =>
                <CellRow array={array} row_number={i} key={i}/>
            )
            }
        </div>
    );
};

export default Field;