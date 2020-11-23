import DataType from './DataType';

type DataSource = Literal | PlayerSelectedDataSource | ScriptedDataSource | SelectorDataSource
export type CalculatedDataSource = Literal | ScriptedDataSource | SelectorDataSource // ScriptedValue cannot reference PlayerSelectedValue

interface _DataSource {
    returnType: DataType,
}

export interface Literal extends _DataSource {
    sourceType: DataSourceType.Literal,
    value: string  // JS literal
}

export interface PlayerSelectedDataSource extends _DataSource {
    sourceType: DataSourceType.PlayerSelected,
    allowedOptions: CalculatedDataSource, // Return type must be the same dataType (multiple variant)
    isValid: CalculatedDataSource, // Return type must be boolean
}

export interface ScriptedDataSource extends _DataSource {
    sourceType: DataSourceType.Function,
    scriptId: string,
    arguments: Record<string, DataSource>
}

export interface SelectorDataSource extends _DataSource {
    sourceType: DataSourceType.Selector,
    selectorParts: string[],
}

export enum DataSourceType {
    Literal,  // JS literal
    Selector, // Select by object path (e.g. board.locations.deck.top)
    Function, // JS script
    PlayerSelected  // Chosen during play
}

export default DataSource