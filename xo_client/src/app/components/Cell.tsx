"use client";

import {CellValue, FieldStatus, useFieldStore} from "@/app/store/FieldStore";
import cell_styles from '@/app/styles/modules/cell.module.scss';
import {useEffect, useState} from "react";
import {isInWinningSequence, isLastMoveCell} from "@/app/utils/field";
import {useSocketStore} from "@/app/store/SocketStore";
import {send_move} from "@/app/utils/requests";
import {useUserStore} from "@/app/store/UserStore";

type CellPropTypes = {
    row_number: number,
    col_number: number,
}

const Cell = ({row_number, col_number}: CellPropTypes) => {
    const [cellStyle, updateCellStyle] = useState<string>(cell_styles.cell);

    const field = useFieldStore(state => state.field);
    const move_number = useFieldStore(state => state.move_number);
    const fieldStatus = useFieldStore(state => state.status);
    const winning_sequence = useFieldStore(state => state.winning_sequence);
    const last_move = useFieldStore(state => state.last_move);
    const x_player = useFieldStore(state => state.x_player);
    const o_player = useFieldStore(state => state.o_player);
    const username = useUserStore(state => state.username);
    const websocket = useSocketStore(state => state.socket);

    const updateCell = useFieldStore(state => state.updateCell);


    useEffect(() => {
        if (isInWinningSequence(winning_sequence, row_number, col_number)){
            if (isLastMoveCell(last_move, row_number, col_number)){
                updateCellStyle(cell_styles.cell_current_and_winning);
            } else {
                updateCellStyle(cell_styles.cell_winning);
            }
        } else {
            if (isLastMoveCell(last_move, row_number, col_number)){
                updateCellStyle(cell_styles.cell_current);
            } else {
                updateCellStyle(cell_styles.cell);
            }
        }

    }, [last_move, winning_sequence, row_number, col_number])

    const handleOnClickCell = () => {
        if (field[row_number][col_number] === CellValue.empty && fieldStatus === FieldStatus.started){
            let val: CellValue = CellValue.empty;
            if (move_number % 2 === 0 && username === x_player){
                val = CellValue.x;
            }
            if (move_number % 2 === 1 && username === o_player){
                val = CellValue.o;
            }

            if (val){
                updateCell(row_number, col_number, val);
                send_move(websocket, [row_number, col_number, val]);
            }

        }
    }

    return (
        <div onClick={handleOnClickCell} className={cellStyle}>
            {field[row_number][col_number]}
        </div>
    );

}

export default Cell;