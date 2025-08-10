import {CellType, CellValue} from "@/app/store/FieldStore";

export const rows_count: number = 18;
export const cols_count: number = 18;

type WinCellType = {
    row: number,
    col: number,
    value: string,
}

export const generateEmptyField = (rows: number, cols: number): Array<Array<CellValue>> => {
    const matrix: Array<Array<CellValue>> = [];
    for (let i = 0; i < rows; i++){
        matrix[i] = [];
        for (let j = 0; j < cols; j++){
            matrix[i][j] = CellValue.empty;
        }
    }
    return matrix;
}
export const isWinningLines = (matrix: Array<Array<CellValue>>,
                               row: number, col: number, value: CellValue): CellType[] | false => {

    const scan_row = (matrix: Array<Array<CellValue>>,
                      row: number, col: number, value: CellValue): CellType[] | false => {
        let counter = 0;
        for (let j = Math.max(col - 4, 0); j <= Math.max(col + 4, cols_count - 1); j++){
            if (matrix[row][j] === value){
                counter++;
                if (counter === 5){
                    return [
                        [row, j, value],
                        [row, j - 1, value],
                        [row, j - 2, value],
                        [row, j - 3, value],
                        [row, j - 4, value],
                    ]
                }
            }
            else{
                counter = 0
            }
        }
        return false;
    }

    const row_scanning = scan_row(matrix, row, col, value);
    if (row_scanning) {
        return row_scanning;
    }

    const scan_column = (matrix: Array<Array<CellValue>>,
                         row: number, col: number, value: CellValue): CellType[] | false => {
        let counter = 0;
        for (let i = Math.max(row - 4, 0); i <= Math.max(row + 4, rows_count - 1); i++){
            if (matrix[i][col] === value){
                counter ++;
                if (counter === 5){
                    return [
                        [i, col, value],
                        [i - 1, col, value],
                        [i - 2, col, value],
                        [i - 3, col, value],
                        [i - 4, col, value],
                    ]
                }
            }
            else{
                counter = 0;
            }
        }
        return false;
    }

    const column_scanning = scan_column(matrix, row, col, value);
    if (column_scanning) {
        return column_scanning;
    }
    return false;
}

export const isWinningDiags = (matrix: Array<Array<CellValue>>,
                               row: number, col: number, value: CellValue): CellType[] | false => {
    const scan_major_diag = (matrix: Array<Array<CellValue>>,
                             row: number, col: number, value: CellValue): CellType[] | false => {
        const start_diff = Math.min(row - Math.max(row - 4, 0),
            col - Math.max(col - 4, 0));
        const end_diff = Math.min(Math.min(row + 4, rows_count - 1) - row,
            Math.min(col + 4, cols_count - 1) - col);
        const total_diff = start_diff + end_diff;
        let counter = 0;
        for (let i = 0; i <= total_diff; i++){
            console.log(row, col, start_diff, i);
            const elem = matrix[row - start_diff + i][col - start_diff + i]
            if (elem === value){
                counter++;
                if (counter === 5){
                    return [
                        [row - start_diff + i, col - start_diff + i, value],
                        [row - start_diff + i - 1, col - start_diff + i - 1, value],
                        [row - start_diff + i - 2, col - start_diff + i - 2, value],
                        [row - start_diff + i - 3, col - start_diff + i - 3, value],
                        [row - start_diff + i - 4, col - start_diff + i - 4, value],
                    ]
                }
            }
            else{
                counter = 0;
            }
        }
        return false;
    }
    const major_diag_scanning = scan_major_diag(matrix, row, col, value);
    if (major_diag_scanning) {
        return major_diag_scanning;
    }

    const scan_minor_diag = (matrix: Array<Array<CellValue>>,
                             row: number, col: number, value: CellValue): CellType[] | false => {
        const start_diff = Math.min(row - Math.max(row - 4, 0),
            Math.min(col + 4, cols_count - 1) - col);
        const end_diff = Math.min(Math.min(row + 4, rows_count - 1) - row,
            col - Math.max(col - 4, 0));
        const total_diff = start_diff + end_diff;
        let counter = 0;
        for (let i = 0; i <= total_diff; i++) {
            const elem = matrix[row - start_diff + i][col + start_diff - i]
            if (elem === value){
                counter++;
                if (counter === 5){
                    return [
                        [row - start_diff + i, col + start_diff - i, value],
                        [row - start_diff + i - 1, col + start_diff - i + 1, value],
                        [row - start_diff + i - 2, col + start_diff - i + 2, value],
                        [row - start_diff + i - 3, col + start_diff - i + 3, value],
                        [row - start_diff + i - 4, col + start_diff - i + 4, value],
                    ]
                }
            }
            else{
                counter = 0;
            }
        }
        return false;
    }

    const minor_diag_scanning = scan_minor_diag(matrix, row, col, value);
    if (minor_diag_scanning) {
        return minor_diag_scanning;
    }

    return false;
}

export const isWinningMatrix = (matrix: Array<Array<CellValue>>,
                                row: number, col: number, value: CellValue): CellType[] | false => {
    let result;
    console.log('checking for winning matrix')
    result = isWinningLines(matrix, row, col, value);
    if (result){
        console.log(result);
        return result;
    }
    result = isWinningDiags(matrix, row, col, value);
    if (result){
        console.log(result)
        return result;
    }
    return false;
}

export const isInWinSequence = (win_sequence: WinCellType[], row: number, col: number): boolean => {
    for (const win_cell of win_sequence){
        if (win_cell.row === row && win_cell.col === col){
            return true;
        }
    }
    return false;
}

export const isLastMoveCell = (last_move: CellType, row: number, col: number) => {
    return last_move[0] === row && last_move[1] === col;
}