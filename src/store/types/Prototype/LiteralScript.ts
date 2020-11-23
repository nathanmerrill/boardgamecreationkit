import DataType from '../data/DataType';
import { Literal } from '../data/DataSource';

// Sharable scripts.  Gets decomposed into a GameScript and ScriptedValue
export type LiteralScript = { 
    returnType: DataType,
    arguments: Record<string, Literal | LiteralScript>
    script: string,
}