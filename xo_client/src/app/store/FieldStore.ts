import {create} from "zustand";
import {cols_count, rows_count, generateEmptyField} from "@/app/utils/field";


export enum FieldStatus{
    started = 'started',
    finished = 'finished',
}

export enum CellValue{
    empty = '',
    x = 'X',
    o = 'O',
}

export type CellType = [number, number, CellValue] // [row, col, val]


type FieldStore = {
    field: Array<Array<CellValue>>,
    rows: Readonly<number>,
    cols: Readonly<number>,
    status: FieldStatus,
    move_number: number,
    winning_sequence: Array<CellType>

    updateStatus: (status: FieldStatus) => void,
    updateCell: (row: number, col: number, val: CellValue) => void,
    updateWinningSequence: (sequence: Array<CellType>) => void,
    increaseMoveNumber: () => void,
}

export const useFieldStore = create<FieldStore>()(set => ({
    field: generateEmptyField(rows_count, cols_count),
    rows: rows_count,
    cols: cols_count,
    status: FieldStatus.started,
    move_number: 0,
    winning_sequence: [],

    updateCell: (row: number, col: number, val: CellValue) => set(state => {
        state.increaseMoveNumber();

        const field = [...state.field];
        field[row][col] = val;
        return {field: field};
    }),

    updateWinningSequence: (sequence: CellType[]) => set(() => ({
        winning_sequence: sequence
    })),

    updateStatus: (new_status: FieldStatus) => set(() => ({
        status: new_status
    })),

    increaseMoveNumber: () => set(state => ({
        move_number: state.move_number + 1
    })),
}))