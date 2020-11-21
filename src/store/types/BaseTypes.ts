import { data } from 'jquery';
// ----- Common interfaces ---


export interface HasId {
    id: string
}

export interface Nameable extends HasId {
    name: string
}

export interface Visible {
    visibleTo: CalculatedValue, //Returns a list of players
}

// Custom key-value data that can be set by the designer (such as card suits), or by scripts during runtime
export interface HasData {
    gameData: Record<string, LiteralValue>
}

// ------ Game values ------
// Game values are ID'd to allow in-game actions to reference them. 

export type GameValue = ScriptedValue | SelectorValue | LiteralValue | PlayerSelectedValue
export type CalculatedValue = ScriptedValue | SelectorValue | LiteralValue // ScriptedValue cannot reference PlayerSelectedValue

interface _GameValue {
    id?: string,
    returnType: DataType,
}

export interface SelectorValue extends _GameValue {
    type: GameValueType.Selector,
    selectorParts: string[],
}

export interface ScriptedValue extends _GameValue {
    type: GameValueType.Function,
    scriptId: string,
    arguments: Record<string, GameValue>
}

export interface LiteralValue extends _GameValue {
    type: GameValueType.Literal,
    value: string  // JS literal
}

export interface PlayerSelectedValue extends _GameValue {
    type: GameValueType.PlayerSelected,
    allowedOptions: CalculatedValue, // Return type must be the same dataType (multiple variant)
    isValid: CalculatedValue, // Return type must be boolean
}

export enum DataType {
    String, Number, Boolean, Piece, Player, Location, Side, Action, Move, GameState,
    Strings, Numbers, Booleans, Pieces, Players, Locations, Sides, Actions, Moves,
}

export namespace DataType{
    export function Default(dataType: DataType){
        if (IsPlural(dataType)){
            return []
        }
        
        switch (dataType){
            case DataType.String: return ""
            case DataType.Number: return 0
            case DataType.Boolean: return false
        }

        return null
    }

    export function IsPlural(dataType: DataType){
        return dataType.valueOf() >= DataType.Strings.valueOf()
    }

    export function ToPlural(dataType: DataType){
        if (IsPlural(dataType) || dataType == DataType.GameState){
            return dataType
        }
        
        return dataType + DataType.Strings.valueOf();
    }

    export function ToSingular(dataType: DataType){
        if (IsPlural(dataType)){
            return dataType - DataType.Strings.valueOf();
        }
        
        return dataType;
    }

    export function IsPrimitive(dataType: DataType){
        switch (dataType){
            case DataType.String:
            case DataType.Number:
            case DataType.Boolean:
                return true;
        }
        
        return false;
    }
}

export enum GameValueType {
    Literal,  // JS literal
    Selector, // Select by object path (e.g. board.locations.deck.top)
    Function, // JS script
    PlayerSelected  // Chosen during play
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