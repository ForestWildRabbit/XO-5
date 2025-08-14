import Header from "@/app/components/Header";
import "@/app/styles/globals.scss";
import cell_styles from "@/app/styles/modules/cell.module.scss";
import Field from "@/app/components/Field";
import {useRouter} from "next/router";
import axios from "axios";
import {useEffect} from "react";
import {useFieldStore} from "@/app/store/FieldStore";
import {domainName} from "@/app/utils/requests";

export default function Game() {
    const router = useRouter();
    const { game_id } = router.query;
    const updateXPlayer = useFieldStore(state => state.updateXPlayer);
    const updateOPlayer = useFieldStore(state => state.updateOPlayer);

    useEffect(() => {
        if (game_id) {
            const get_game = async () => {
                try {
                    console.log(game_id);
                    const response = await axios.get(`https://${domainName}/api/game/${game_id}`);
                    const response_data = response.data;
                    updateXPlayer(response_data.x_player);
                    updateOPlayer(response_data.o_player);

                } catch (error) {
                    console.error('Error fetching game:', error);
                }
            };

            get_game().then();
        }
    }, [game_id]);

    return (
        <div>
            <Header/>
            <div className={cell_styles.field}>
                <Field/>
            </div>
        </div>


    );
}