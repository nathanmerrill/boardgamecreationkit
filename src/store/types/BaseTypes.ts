// ----- Common interfaces ---

export interface HasId {
    id: string
}

export interface Nameable extends HasId {
    name: string
}

export interface Visible {
    visibleTo: LiteralValue | ScriptedValue, // Returns a list of players.  ScriptedValue cannot reference PlayerSelectedValue
}

// Custom key-value data that can be set by the designer (such as card suits), or by scripts during runtime
export interface HasData {
    gameData: Record<string, LiteralValue>
}

// ------ Game values ------
// Game values are ID'd to allow in-game actions to reference them. 

export type GameValue = ScriptedValue | LiteralValue | PlayerSelectedValue

export interface ScriptedValue {
    id?: string,
    type: GameValueType.Function,
    returnType: DataType,
    scriptId: string,
    arguments: Record<string, GameValue>
}

export interface LiteralValue {
    id?: string,
    type: GameValueType.Literal,
    returnType: DataType,
    value: string  // Must be a javascript literal
}

export interface PlayerSelectedValue {
    id?: string,
    type: GameValueType.PlayerSelected,
    returnType: DataType,  // Cannot be Action, Move, GameState, Actions, Moves
    allowedOptions: GameValue, // Return type must be the same dataType (multiple variant)
    isValid: GameValue, // Return type must be boolean
}

export enum DataType {
    String, Number, Boolean, Piece, Player, Location, Side, Action, Move, GameState,
    Strings, Numbers, Booleans, Pieces, Players, Locations, Sides, Actions, Moves,
}

export enum GameValueType {
    Literal,
    Function,
    PlayerSelected
}

export interface GameScript extends Nameable {
    script: string,
    parameters: Record<string, DataType>,
    returnType: DataType
}

// Sharable scripts.  Gets decomposed into a GameScript and ScriptedValue
export type LiteralScript = { 
    returnType: DataType,
    arguments: Record<string, LiteralValue | LiteralScript>
    script: string,
}