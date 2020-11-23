import DataType from './data/DataType';
import { CalculatedDataSource, Literal } from './data/DataSource';

export interface HasId {
    id: string
}

export interface Nameable extends HasId {
    name: string
}

export interface Visible {
    visibleTo: CalculatedDataSource, //Returns a list of players
}

// Custom key-value data that can be set by the designer (such as card suits), or by scripts during runtime
export interface HasData {
    gameData: Record<string, Literal>
}

export interface GameScript extends Nameable {
    script: string,
    parameters: Record<string, DataType>,
    returnType: DataType
}