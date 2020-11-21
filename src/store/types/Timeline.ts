import { CalculatedValue, DataType, GameValueType, Nameable, ScriptedValue } from './BaseTypes';


export interface GameAction extends Nameable {
    newGameState: ScriptedValue  // Must return GameState
    automatic: boolean
    available: CalculatedValue // Returns boolean
}

export namespace GameAction {
    export const EMPTY: GameAction = {
        id: "",
        name: "",
        automatic: false,
        available: {
            type: GameValueType.Literal,
            returnType: DataType.Boolean,
            value: "true",
        },
        newGameState: {
            type: GameValueType.Function,
            returnType: DataType.GameState,
            scriptId: "",
            arguments: {}
        }
    }
}

export interface GamePhase extends Nameable {
    actions: Record<string, GameAction>
    terminal: boolean
}

export namespace GamePhase {
    export const EMPTY: GamePhase = {
        id: "",
        name: "",
        actions: {},
        terminal: false,
    }
}