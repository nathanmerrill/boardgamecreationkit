import { DataType, GameValueType, LiteralValue } from '../types/BaseTypes';

export const TRUE: LiteralValue = {
    type: GameValueType.Literal,
    value: "true",
    returnType: DataType.Boolean,
}

export const FALSE: LiteralValue = {
    type: GameValueType.Literal,
    value: "false",
    returnType: DataType.Boolean,
}

export const NO_PLAYERS: LiteralValue = {
    type: GameValueType.Literal,
    value: "[]",
    returnType: DataType.Players,
}

export const EMPTY_STRING: LiteralValue = {
    type: GameValueType.Literal,
    returnType: DataType.String,
    value: ""
}