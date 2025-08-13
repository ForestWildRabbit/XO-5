import {FormMessage, Players} from "@/app/components/CreateGame";
import {Dispatch, SetStateAction} from "react";

export const validate_create_game = (players: Players,
                                 setFormMessage: Dispatch<SetStateAction<FormMessage>>): boolean => {
    // returns false is validation failed, otherwise - returns true
    if (players.x_player.length < 4 || players.x_player.length > 16 ||
        players.o_player.length < 4 || players.o_player.length > 16
    ){
        setFormMessage({message: 'Username length must be in range [4, 16]', status: 'error'});
        return false;
    }

    // other validation is up to server
    return true;

}