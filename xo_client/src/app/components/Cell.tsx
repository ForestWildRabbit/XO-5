"use client";

import {CellValue, FieldStatus, useFieldStore} from "@/app/store/FieldStore";
import cell_styles from '../styles/modules/cell.module.scss';
import {useState} from "react";
import {isWinningMatrix} from "@/app/utils/field";

type CellPropTypes = {
    row_number: number,
    col_number: number,
}

const Cell = ({row_number, col_number}: CellPropTypes) => {
    const [cell_style, ] = useState<string>(cell_styles.cell);

    const field = useFieldStore(state => state.field);
    const move_number = useFieldStore(state => state.move_number);
    const fieldStatus = useFieldStore(state => state.status);

    const updateCell = useFieldStore(state => state.updateCell);
    const updateStatus = useFieldStore(state => state.updateStatus);
    const updateWinningSequence = useFieldStore(state => state.updateWinningSequence);

    const handleOnClickCell = () => {
        if (field[row_number][col_number] === CellValue.empty && fieldStatus === FieldStatus.started){
            let val;
            if (move_number % 2 === 0){
                val = CellValue.x;
            } else {
                val = CellValue.o;
            }
            updateCell(row_number, col_number, val);

            const win_sequence = isWinningMatrix(field, row_number, col_number, val);
            if (win_sequence){
                updateStatus(FieldStatus.finished);
                updateWinningSequence(win_sequence);
            }

            console.log(row_number, col_number);
        }
    }

    return (
        <div onClick={handleOnClickCell} className={cell_style}>
            {field[row_number][col_number]}
        </div>
    );

}

export default Cell;