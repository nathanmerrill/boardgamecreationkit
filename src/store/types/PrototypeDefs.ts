import { BoardLocation, Piece } from "./Pieces";
import { GameValue, Nameable } from "./BaseTypes";

// Additional properties a script can add to a piece or location
export interface GameDataDef {
    gameDataDef: Record<string, GameValue> // Dynamically calculate initial data based on dataset.  The return value of the ScriptedValue will determine the datatype of the data value
}

export interface GameImageDef {
    svgDef: GameValue // Passed in dataset row & image, returns an SVG definition
}

export interface Dataset {
    columns: string[]
    data: string[][]
}

export interface PieceSet extends Nameable {
    dataset: Dataset, // The Nth iteration will use the (N%datasetSize) row
    copies: number, // Total number of copies to make.  -1 indicates to use the dataSet size
    piece: Piece, // The piece to create copies of
    pieceDef: GameValue  // Passed in dataset row & piece, returns a modified piece
}

export interface BoardLocationSet extends Nameable {
    boardPieceId: string, // The board to add these locations to
    dataset: Dataset,
    copies: number,
    location: BoardLocation,
    locationDef: GameValue
}