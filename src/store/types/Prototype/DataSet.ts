import { Nameable } from '../BaseTypes';

export interface DataSet extends Nameable {
    columns: string[]
    data: string[][]
}

export const EMPTY_DATASET: DataSet = {
    id: "",
    name: "",
    columns: [],
    data: [[""],[""]]    
}