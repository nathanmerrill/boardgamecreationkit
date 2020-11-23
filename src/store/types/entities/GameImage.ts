import { Nameable } from '../Interfaces';

export default interface GameImage extends Nameable {
    svg: string,
}

export const EMPTY_GAME_IMAGE: GameImage = {
    id: "",
    name: "",
    svg: ""
}