import Piece, { EMPTY_PIECE, PieceSide } from '../entities/Piece';
import Prototype from '.';
import { Nameable } from '../Interfaces';


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


export function GetDataSet(pieceSet: PieceSet, prototype: Prototype) {
    return (pieceSet.dataSetId ? prototype.allPieceSets[pieceSet.dataSetId] : pieceSet).dataSet
}

export default interface PieceSet extends Nameable {
    copies: number, // Total number of copies to make
    dataSet: DataSet, // The Nth iteration will use the (N%datasetSize) row
    dataSetId: string, // PieceSet id to allow for multiple piece sets to use the same data
    piece: Piece, 
    nameDef: string,
    dataDef: Record<string, string>
    imageDef: string,
    sideDefs: Record<string, SideDef>

}

export const EMPTY_PIECE_SET: PieceSet = {
    id: "",
    name: "",
    copies: 1,
    dataSet: EMPTY_DATASET,
    dataSetId: "",
    piece: EMPTY_PIECE,
    nameDef: "",
    dataDef: {},
    imageDef: "",
    sideDefs: {},
}

export interface SideDef extends Nameable {
    side: PieceSide,
    imageDef: string,
    visibleDef: string,
}