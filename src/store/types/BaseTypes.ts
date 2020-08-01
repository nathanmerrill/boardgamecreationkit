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
    gameData: Record<string, LiteralValue>
}

export interface GameValue {
    type: ValueType,
    returnType: DataType,
}

export interface ScriptedValue extends GameValue {
    type: ValueType.Function,
    scriptId: string,
    arguments: Record<string, ScriptedValue | LiteralValue>
}

export interface LiteralValue extends GameValue {
    type: ValueType.Literal,
    value: string
}

export enum DataType {
    String, Number, Boolean, Piece, Player, Location, Side, Action, Move, GameState,
    Strings, Numbers, Booleans, Pieces, Players, Locations, Sides, Actions, Moves,    
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

export const EMPTY_GAME_IMAGE: GameImage = {
    id: "",
    name: "",
    svg: ""
}


export const EMPTY_LITERAL_VALUE: LiteralValue = {
    type: ValueType.Literal,
    returnType: DataType.String,
    value: ""
}