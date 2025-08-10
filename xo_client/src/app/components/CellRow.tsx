import Cell from "@/app/components/Cell";

type CellRowPropTypes = {
    array: string[],
    row_number: number,
}
const CellRow = ({array, row_number}: CellRowPropTypes) => {
    return (
        <div>
            {array.map((_, j) =>
                <Cell row_number={row_number} col_number={j} key={j}/>
            )}
        </div>

    );
};

export default CellRow;