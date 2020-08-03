import Piece, { EMPTY_PIECE, PieceSide } from '../Piece';
import { Nameable } from '../BaseTypes';


export default interface PieceSet extends Nameable {
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