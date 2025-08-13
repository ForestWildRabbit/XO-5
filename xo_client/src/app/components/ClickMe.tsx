
import axios from "axios";

const ClickMe = () => {

    const temp = async () => {
        try {
            const response = await axios.get('https://localhost/api/game/');
            console.log(response);
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