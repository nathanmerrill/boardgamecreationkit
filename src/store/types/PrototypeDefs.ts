import { BoardLocation, Piece, PieceSide, EMPTY_PIECE, EMPTY_BOARD_LOCATION } from "./Pieces";
import {  Nameable } from "./BaseTypes";

export interface DataSet extends Nameable {
    columns: string[]
    data: string[][]
}

export interface PieceSet extends Nameable {
    dataSetId: string, // The Nth iteration will use the (N%datasetSize) row
    copies: number, // Total number of copies to make
    piece: Piece, 
    nameDef: string,
    dataDef: Record<string, string>
    imageDef: string,
    sideDefs: Record<string, SideDef>
}

export const EMPTY_PIECE_SET: PieceSet = {
    id: "",
    name: "",
    dataSetId: "",
    copies: 1,
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

export interface BoardLocationSet extends Nameable {
    boardPieceId: string, // The board to add these locations to
    datasetId: string,
    copies: number,
    boardLocation: BoardLocation,
    adjacencyDef: Record<string, string>
    positionXDef: string,
    positionYDef: string,
    imageDef: string,
}

export const EMPTY_BOARD_LOCATION_SET: BoardLocationSet = {
    id: "",
    name: "",
    datasetId: "",
    copies: 1,
    boardPieceId: "",
    adjacencyDef: {},
    positionXDef: "",
    positionYDef: "",
    imageDef: "",
    boardLocation: EMPTY_BOARD_LOCATION,
}

export const EMPTY_DATASET: DataSet = {
    id: "",
    name: "",
    columns: [],
    data: [[""],[""]]    
}