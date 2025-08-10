import {useFieldStore} from "@/app/store/FieldStore";
import CellRow from "@/app/components/CellRow";

const Field = () => {
    const field: string[][] = useFieldStore(state => state.field);

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