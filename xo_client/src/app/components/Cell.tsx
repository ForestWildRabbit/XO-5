"use client";

import {CellValue, FieldStatus, useFieldStore} from "@/app/store/FieldStore";
import cell_styles from '@/app/styles/modules/cell.module.scss';
import {useEffect, useState} from "react";
import {isInWinningSequence, isLastMoveCell} from "@/app/utils/field";
import {useSocketStore} from "@/app/store/SocketStore";
import {send_move} from "@/app/utils/requests";

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
            let val: CellValue;
            if (move_number % 2 === 0){
                val = CellValue.x;
            } else {
                val = CellValue.o;
            }
            updateCell(row_number, col_number, val);
            send_move(websocket, [row_number, col_number, val]);
        }
    }

    return (
        <div onClick={handleOnClickCell} className={cellStyle}>
            {field[row_number][col_number]}
        </div>
    );

}

export default Cell;