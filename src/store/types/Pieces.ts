import { Nameable, Visible, HasData, GameValue } from "./BaseTypes";
import { NO_PLAYERS } from "./Literals";

export enum PieceType {
    Simple,
    Sided,      // Has multiple sides
    Collection, // Contains other pieces (decks, bags)
    Timer,
    Drawing,
    Text,
    Board,
}

export interface Piece extends Nameable, Visible, HasData {
    type: PieceType,
    imageId: string,
}

export interface PieceSide extends Nameable, Visible, HasData {
    imageId: string,
}

// Sided piece (dice, cards)
export interface SidedPiece extends Piece {
    type: PieceType.Sided,
    sideIds: string[],
}

export interface CollectionPiece extends Piece {
    type: PieceType.Collection,
    sizeVisibleTo: GameValue // Returns a list of players
}


// Timers: Causes an event to occur at a future time
export interface TimerPiece extends Piece {
    type: PieceType.Timer,
    font: string,
    actionId: string,
}

// Text: Players can draw on these pieces (crayon style)
export interface DrawingPiece extends Piece {
    type: PieceType.Drawing,
    width: number,
}

// Text: Players can write on these pieces
export interface TextPiece extends Piece {
    type: PieceType.Text,
    font: string,
}

// Boards: Contain locations that pieces can be placed on
export interface BoardPiece extends Piece {
    type: PieceType.Board,
    locationIds: string[],
}

export interface BoardLocation extends Nameable, Visible, HasData {
    adjacenctLocationIds: Record<string, string>, //Named adjacencies.  Names are used to allow similar traversal across multiple locations
    position: BoardPosition,
    imageId: string,
}

export interface BoardPosition {
    x: number,
    y: number,
}


export const EMPTY_PIECE: Piece = {
    id: "",
    name: "",
    type: PieceType.Simple,
    visibleTo: NO_PLAYERS,
    gameData: {},
    imageId: "",
}
