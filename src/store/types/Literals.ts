import { LiteralValue, ValueType, DataType } from "./BaseTypes";

export const TRUE: LiteralValue = {
    type: ValueType.Literal,
    value: "true",
    returnType: DataType.Boolean,
}

export const FALSE: LiteralValue = {
    type: ValueType.Literal,
    value: "false",
    returnType: DataType.Boolean,
}

export const NO_PLAYERS: LiteralValue = {
    type: ValueType.Literal,
    value: "[]",
    returnType: DataType.Players,
}

export const ALL_PLAYERS: LiteralValue = {
    type: ValueType.Literal,
    value: "Object.values(game.allPlayers)",
    returnType: DataType.Players,
}