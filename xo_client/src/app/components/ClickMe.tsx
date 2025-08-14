
import axios from "axios";
import {useUserStore} from "@/app/store/UserStore";

const ClickMe = () => {
    const username = useUserStore(state => state.username);

    const temp = async () => {
        try {
            const response = await axios.get('https://localhost/api/game/');
            console.log(response);
            console.log(username);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    return (
        <div onClick={temp}>
            Click me
        </div>

    );
};

export default ClickMe;