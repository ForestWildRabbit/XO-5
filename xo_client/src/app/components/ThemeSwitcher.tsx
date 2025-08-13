import {Theme, useThemeStore} from "@/app/store/ThemeStore";
import switcher_styles from "@/app/styles/modules/switcher.module.scss";
import Image from "next/image";
import {useEffect, useState} from "react";

const ThemeSwitcher = () => {
    const theme = useThemeStore(state => state.theme);
    const updateTheme = useThemeStore(state => state.updateTheme);

    const [style, setStyle] = useState<string>(switcher_styles.icon_wrapper_dark);

    useEffect(() => {
        if (theme === Theme.light){
            setStyle(switcher_styles.icon_wrapper_light);
        }
        if (theme === Theme.dark){
            setStyle(switcher_styles.icon_wrapper_dark);
        }
    }, [theme])

    return (
        <div className={switcher_styles.icon_container}>
            <div className={style} id={"sun_outline_wrapper"}
                 onClick={() => updateTheme(Theme.light)}>
                <Image src="/theme_icons/sun_outline.png" alt="Sun" width={"32"} height={"32"}/>
            </div>
            <div className={style} id={"moon_outline_wrapper"}
                 onClick={() => updateTheme(Theme.dark)}>
                <Image src="/theme_icons/moon_outline.png" alt="Moon" width={"32"} height={"32"}/>
            </div>
        </div>
    );
};

export default ThemeSwitcher;