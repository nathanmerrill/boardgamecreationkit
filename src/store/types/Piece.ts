import { GameValue, HasData, Nameable, Visible } from './BaseTypes';
import { NO_PLAYERS } from '../library/LiteralValues';

export enum PieceType {
    Simple,
    Sided,      // Has multiple sides
    Collection, // Contains other pieces (decks, bags)
    Timer,
    Drawing,
    Text,
    Board,
}

interface PieceBase extends Nameable, Visible, HasData {
    type: PieceType,
    imageId: string,
}

export interface SimplePiece extends PieceBase {
    type: PieceType.Simple
}

// Sided piece (dice, cards)
export interface SidedPiece extends PieceBase {
    type: PieceType.Sided,
    sideIds: string[],
}

export interface PieceSide extends Nameable, Visible {
    imageId: string,
}

// Collection pieces contain other pieces
export interface CollectionPiece extends PieceBase {
    type: PieceType.Collection,
    sizeVisibleTo: GameValue // Returns a list of players
}

// Timers: Causes an event to occur at a future time
export interface TimerPiece extends PieceBase {
    type: PieceType.Timer,
    font: string,
    actionId: string,
}

// Text: Players can draw on these pieces (crayon style)
export interface DrawingPiece extends PieceBase {
    type: PieceType.Drawing,
    penWidth: number,
}

// Text: Players can write on these pieces
export interface TextPiece extends PieceBase {
    type: PieceType.Text,
    font: string,
}

// Boards: Contain locations that pieces can be placed on
export interface BoardPiece extends PieceBase {
    type: PieceType.Board,
    locationIds: string[],
}

export interface BoardLocation extends Nameable, Visible, HasData {
    adjacenctLocationIds: Record<string, string>, //Named adjacencies.  Names are used to allow similar traversal across multiple locations
    position: BoardPosition,  // Relative to piece position
    imageId: string,
}

export interface BoardPosition {
    x: number,
    y: number,
}

export const EMPTY_BOARD_LOCATION: BoardLocation = {
    id: "",
    name: "",
    visibleTo: NO_PLAYERS,
    adjacenctLocationIds: {},
    position: {
        x: 0,
        y: 0
    },
    imageId: "",
    gameData: {}
}


type Piece = BoardPiece | TextPiece | DrawingPiece | TimerPiece | CollectionPiece | SidedPiece | SimplePiece

export default Piece

export const EMPTY_PIECE: SimplePiece = {
    id: "",
    name: "",
    type: PieceType.Simple,
    visibleTo: NO_PLAYERS,
    gameData: {},
    imageId: "",
}