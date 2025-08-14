import Link from 'next/link';
import header_styles from "@/app/styles/modules/header.module.scss";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import ClickMe from "@/app/components/ClickMe";
import CreateGame from "@/app/components/CreateGame";
import ModalWindow from "@/app/components/ModalWindow";
import {useState} from "react";
import CreateUser from "@/app/components/CreateUser";
import {useUserStore} from "@/app/store/UserStore";

const Header = () => {
    const [createGameActive, setCreateGameActive] = useState<boolean>(false);
    const [createUserActive, setCreateUserActive] = useState<boolean>(false);
    const username = useUserStore(state => state.username);

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
                Create game
            </div>

            <div className={header_styles.header_child_left} onClick={() => setCreateUserActive(true)}>
                {username ? username : 'Create user'}
            </div>

            <ModalWindow modalActive={createGameActive} setModalActive={setCreateGameActive}>
                <CreateGame setModalActive={setCreateGameActive}/>
            </ModalWindow>

            <ModalWindow modalActive={createUserActive} setModalActive={setCreateUserActive}>
                <CreateUser setModalActive={setCreateUserActive}/>
            </ModalWindow>
        </header>
    );
};

export default Header;