import { LiteralValue, ValueType, DataType } from "./BaseTypes";

export const TRUE: LiteralValue = {
    type: ValueType.Literal,
    value: "true",
    returnType: DataType.Boolean,
    constant: true,
}

export const FALSE: LiteralValue = {
    type: ValueType.Literal,
    value: "false",
    returnType: DataType.Boolean,
    constant: true,
}

export const NO_PLAYERS: LiteralValue = {
    type: ValueType.Literal,
    value: "[]",
    returnType: DataType.Players,
    constant: true,
}

export const ALL_PLAYERS: LiteralValue = {
    type: ValueType.Literal,
    value: "Object.values(game.allPlayers)",
    returnType: DataType.Players,
    constant: false,
}