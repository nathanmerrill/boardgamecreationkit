import { Nameable, GameValue } from "./BaseTypes";

export interface GameAction extends Nameable {
    script: GameValue, // Passed a GameState and Game, returns a modified GameState
}

export enum MoveType {
    Choice,        // Player chooses an action
    Draw,          // Player draws on a board
    Write,         // Player writes some text
    PickNumber,    // Player picks a number
}

export interface GameMove extends Nameable {
    playerId: string,
    actionId: string,
    moveType: MoveType,
    availableCondition: GameValue,
    undoableCondition: GameValue,
}

export interface DrawMove extends GameMove {
    moveType: MoveType.Draw,
    piece: GameValue,
}

export interface WriteMove extends GameMove {
    moveType: MoveType.Write,
    piece: GameValue,
}

export interface ChoiceMove extends GameMove {
    moveType: MoveType.Choice,
    actionIds: string[],
}

export interface PickNumberMove extends GameMove {
    moveType: MoveType.PickNumber,
    numbers: GameValue,
}
