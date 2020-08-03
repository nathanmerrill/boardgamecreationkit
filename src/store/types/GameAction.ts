import {
    DataType,
    GameValue,
    GameValueType,
    Nameable
    } from './BaseTypes';

export default interface GameAction extends Nameable {
    newGameState: GameValue,  // Must return GameState
}

export const EMPTY_GAME_ACTION: GameAction = {
    id: "",
    name: "",
    newGameState: {
        id: "",
        type: GameValueType.Literal,
        value: "null",
        returnType: DataType.GameState
    }
}