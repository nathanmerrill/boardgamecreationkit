// Fundamental types for game data

export interface HasId {
    id: string
}

export interface Nameable extends HasId {
    name: string
}

export interface Visible {
    visibleTo: GameValue, // Returns a list of players
}

// Custom key-value data that can be set by the designer (such as card suits), or by scripts during runtime
export interface HasData {
    gameData: Record<string, GameValue>
}

export interface GameValue {
    type: ValueType,
    returnType: DataType,
}

export interface ScriptedValue {
    type: ValueType.Function,
    scriptId: string,
    arguments: Record<string, GameValue>
}

export interface LiteralValue extends GameValue {
    type: ValueType.Literal,
    value: string,
    constant: boolean,
}

export enum DataType {
    String, Number, Boolean, Piece, Player, Location, Side,
    Strings, Numbers, Booleans, Pieces, Players, Locations, Sides,
}

export enum ValueType {
    Literal,
    Function
}

export interface GameScript extends Nameable {
    script: string,
    parameters: Record<string, DataType>,
    returnType: DataType
}

export interface GameImage extends Nameable {
    svg: string,
}

