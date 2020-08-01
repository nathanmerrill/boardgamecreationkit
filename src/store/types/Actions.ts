import { Nameable, GameValue,  ValueType, DataType, LiteralValue, ScriptedValue } from "./BaseTypes";
import { GameState } from "./GameState";

export interface GameAction extends Nameable {
    value: LiteralValue | ScriptedValue,
}

export type LiteralScript = {
    returnType: DataType,
    arguments: Record<string, LiteralScript | LiteralValue>
    script: string,
}

export const GameScripts: Record<string, LiteralScript> = {
    Multistep: {
        returnType: DataType.GameState,
        arguments: {
            steps: {
                type: ValueType.Literal,
                value: "[]",
                returnType: DataType.Actions,
            }
        },
        script: ((state: GameState, steps: GameAction[]) => {
            state.queuedActions.concat(steps.map(s => s.id))
        }).toString(),        
    }
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
