import Header from "@/app/components/Header";
import "@/app/styles/globals.scss";
import cell_styles from "@/app/styles/modules/cell.module.scss";
import Field from "@/app/components/Field";

export default function Game() {

    return (
        <div>
            <Header/>
            <div className={cell_styles.field}>
                <Field/>
            </div>
        </div>


    );
}