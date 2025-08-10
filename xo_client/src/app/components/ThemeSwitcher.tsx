import {Theme, useThemeStore} from "@/app/store/ThemeStore";
import axios from "axios";

const ThemeSwitcher = () => {
    const theme = useThemeStore(state => state.theme);
    const updateTheme = useThemeStore(state => state.updateTheme);

    const temp = async () => {
        try {
            const response = await axios.get('https://localhost/api/game/');
            console.log(response);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    return (
        <div className={"icon-container"}>
            <div className={`icon-wrapper ${theme}`} id={"sun_outline_wrapper"}
                 onClick={() => updateTheme(Theme.light)}>
                <img src="/theme_icons/sun_outline.png" alt="Sun" width={"32"} height={"32"}/>
            </div>
            <div className={`icon-wrapper ${theme}`} id={"moon_outline_wrapper"}
                 onClick={() => updateTheme(Theme.dark)}>
                <img src="/theme_icons/moon_outline.png" alt="Moon" width={"32"} height={"32"}/>
            </div>
            <div onClick={temp}>
                Click me
            </div>
        </div>
    );
};

export default ThemeSwitcher;