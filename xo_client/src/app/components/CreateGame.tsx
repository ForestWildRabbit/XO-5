import "@/app/styles/globals.scss";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import axios from "axios";
import form_styles from "@/app/styles/modules/form.module.scss";
import {validate_create_game} from "@/app/utils/validation";

export type Players = {
    x_player: string,
    o_player: string
}

export type FormMessage = {
    message: string;
    status: 'error' | 'success';
}

type CreateGamePropTypes = {
    setModalActive: Dispatch<SetStateAction<boolean>>,
}

export default function CreateGame({setModalActive}: CreateGamePropTypes) {
    const [players, setPlayers] = useState<Players>({
        x_player: '',
        o_player: '',
    })

    const [formMessage, setFormMessage] = useState<FormMessage>({
        message: '',
        status: 'success',
    });

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPlayers((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (event: FormEvent)=> {
        event.preventDefault();
        if (validate_create_game(players, setFormMessage)){
            try{
                const response = await axios.post('https://localhost/api/game/',
                    {...players});
                console.log(response);

                setFormMessage({message: 'The game was created', status: 'success'});
                setTimeout(() => setModalActive(false), 2000);
            }
            catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        type={"text"}
                        name={"x_player"}
                        placeholder={"x_player"}
                        value={players.x_player}
                        onChange={handleFormChange}
                        className={form_styles.create_game_input}
                    />
                </div>
                <div>
                    <input
                        type={"text"}
                        name={"o_player"}
                        placeholder={"o_player"}
                        value={players.o_player}
                        onChange={handleFormChange}
                        className={form_styles.create_game_input}
                    />
                </div>
                <button type="submit" className={form_styles.create_game_submit}>Create</button>
            </form>
            <div className={formMessage.status === 'error' ? form_styles.form_error : form_styles.form_success}>
                {formMessage.message}
            </div>
        </>
    )
}