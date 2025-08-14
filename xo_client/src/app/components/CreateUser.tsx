import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {FormMessage} from "@/app/components/CreateGame";
import form_styles from "@/app/styles/modules/form.module.scss";
import {validate_create_user} from "@/app/utils/validation";
import {useUserStore} from "@/app/store/UserStore";


export type User = {
    username: string
}

type CreateUserPropTypes = {
    setModalActive: Dispatch<SetStateAction<boolean>>,
}

export default function CreateUser({setModalActive}: CreateUserPropTypes) {
    const [user, setUser] = useState<User>({
        username: ''
    });

    const [formMessage, setFormMessage] = useState<FormMessage>({
        message: '',
        status: 'success',
    });

    const updateUsername = useUserStore(state => state.updateUsername);

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (event: FormEvent)=> {
        event.preventDefault();
        if (validate_create_user(user, setFormMessage)){
            try{
                updateUsername(user.username);
                console.log(user);

                setFormMessage({message: 'The user was created', status: 'success'});
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
                        name={"username"}
                        placeholder={"username"}
                        value={user.username}
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