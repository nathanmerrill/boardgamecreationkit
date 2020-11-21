import { BoardPiece } from '../Piece';
import { Nameable } from '../BaseTypes';


export default interface BoardLocationSet extends Nameable {
    boardPieceId: string, // The board to add these locations to
    datasetId: string,
    copies: number,
    boardLocation: BoardPiece.Location,
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
    boardLocation: BoardPiece.Location.EMPTY,
}