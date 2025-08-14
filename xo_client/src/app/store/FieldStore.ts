import {create} from "zustand";
import {cols_count, rows_count, generateEmptyField, isWinningMatrix} from "@/app/utils/field";


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
    moves: CellType[],
    winning_sequence: Array<CellType>,
    last_move: CellType | null,
    x_player: string | null,
    o_player: string | null,

    updateXPlayer: (player: string) => void,
    updateOPlayer: (player: string) => void,

    addMove: (move: CellType) => void,
    updateLastMove: (move: CellType) => void,
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
    moves: [],
    winning_sequence: [],
    last_move: null,
    x_player: null,
    o_player: null,

    updateCell: (row: number, col: number, val: CellValue) => set(state => {
        state.increaseMoveNumber();
        state.updateLastMove([row, col, val]);
        state.addMove([row, col, val]);

        const field = [...state.field];
        field[row][col] = val;

        const win_sequence = isWinningMatrix(field, row, col, val);
        if (win_sequence){
            state.updateStatus(FieldStatus.finished);
            state.updateWinningSequence(win_sequence);
        }

        return {field: field};
    }),

    updateXPlayer: (player: string) => set(() => ({
        x_player: player
    })),

    updateOPlayer: (player: string) => set(() => ({
        o_player: player
    })),

    addMove: (move: CellType) => set(state => {
        const moves = [...state.moves, move];
        return {moves: moves}
    }),

    updateLastMove: (move: CellType) => set(() => ({
        last_move: move
    })),

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