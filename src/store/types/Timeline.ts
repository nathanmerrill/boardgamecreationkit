import DataType from './data/DataType';
import { CalculatedDataSource, DataSourceType, ScriptedDataSource } from './data/DataSource';
import { Nameable } from './Interfaces';

export interface GameAction extends Nameable {
    newGameState: ScriptedDataSource  // Must return GameState
    automatic: boolean
    available: CalculatedDataSource // Returns boolean
}

export namespace GameAction {
    export const EMPTY: GameAction = {
        id: "",
        name: "",
        automatic: false,
        available: {
            sourceType: DataSourceType.Literal,
            returnType: DataType.Boolean,
            value: "true",
        },
        newGameState: {
            sourceType: DataSourceType.Function,
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