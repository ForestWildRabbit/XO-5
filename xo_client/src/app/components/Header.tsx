import Link from 'next/link';
import header_styles from "@/app/styles/modules/header.module.scss";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import ClickMe from "@/app/components/ClickMe";
import CreateGame from "@/app/components/CreateGame";
import ModalWindow from "@/app/components/ModalWindow";
import {useState} from "react";

const Header = () => {
    const [createGameActive, setCreateGameActive] = useState<boolean>(false);

    return (
        <header className={header_styles.header_container}>
            <div className={header_styles.header_child_left_not_clickable}>
                <ThemeSwitcher/>
            </div>
            <div className={header_styles.header_child_left}>
                <ClickMe/>
            </div>
            <div className={header_styles.header_child_left}>
                <Link href={"/"}>Home</Link>
            </div>
            <div className={header_styles.header_child_left}>
                <Link href={"/game"}>Game</Link>
            </div>

            <div className={header_styles.header_child_left} onClick={() => setCreateGameActive(true)}>
                Create
            </div>

            <ModalWindow modalActive={createGameActive} setModalActive={setCreateGameActive}>
                <CreateGame setModalActive={setCreateGameActive}/>
            </ModalWindow>
        </header>
    );
};

export default Header;