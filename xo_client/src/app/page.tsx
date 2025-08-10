"use client"

import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Field from "@/app/components/Field";

export default function Home() {

    return (
        <div>
            <div>
                <ThemeSwitcher/>
            </div>
            <div className={'field'}>
                <Field/>
            </div>
        </div>


    );
}
