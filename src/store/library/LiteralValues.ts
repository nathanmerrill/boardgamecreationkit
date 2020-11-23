import DataType from '../types/data/DataType';
import { DataSourceType, Literal } from '../types/data/DataSource';


export const TRUE: Literal = {
    sourceType: DataSourceType.Literal,
    value: "true",
    returnType: DataType.Boolean,
}

export const FALSE: Literal = {
    sourceType: DataSourceType.Literal,
    value: "false",
    returnType: DataType.Boolean,
}

export const NO_PLAYERS: Literal = {
    sourceType: DataSourceType.Literal,
    value: "[]",
    returnType: DataType.Players,
}

export const EMPTY_STRING: Literal = {
    sourceType: DataSourceType.Literal,
    returnType: DataType.String,
    value: ""
}