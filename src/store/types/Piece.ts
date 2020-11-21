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

interface _Piece extends Nameable, Visible, HasData {
    type: PieceType,
    imageId: string,
}

export interface SimplePiece extends _Piece {
    type: PieceType.Simple
}

// Sided piece (dice, cards)
export interface SidedPiece extends _Piece {
    type: PieceType.Sided,
    sideIds: string[],
}

export namespace SidedPiece {
    export interface Side extends Nameable, Visible {
        imageId: string,
    }
}

// Collection pieces contain other pieces
export interface CollectionPiece extends _Piece {
    type: PieceType.Collection,
    sizeVisibleTo: GameValue // Returns a list of players
}

// Timers: Causes an event to occur at a future time
export interface TimerPiece extends _Piece {
    type: PieceType.Timer,
    font: string,
    actionId: string,
}

// Text: Players can draw on these pieces (crayon style)
export interface DrawingPiece extends _Piece {
    type: PieceType.Drawing,
    penWidth: number,
}

// Text: Players can write on these pieces
export interface TextPiece extends _Piece {
    type: PieceType.Text,
    font: string,
}

// Boards: Contain locations that pieces can be placed on
export interface BoardPiece extends _Piece {
    type: PieceType.Board,
    locationIds: string[],
}

export namespace BoardPiece {
    export interface Location extends Nameable, Visible, HasData {
        adjacenctLocationIds: Record<string, string>, //Named adjacencies.  Names are used to allow similar traversal across multiple locations
        position: BoardPiece.Location.Position,
        imageId: string,
    }
    
    export namespace Location {
        export const EMPTY = {
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
        
        export interface Position {
            x: number,
            y: number,
        }   
    } 
}

type Piece = BoardPiece | TextPiece | DrawingPiece | TimerPiece | CollectionPiece | SidedPiece | SimplePiece

export default Piece

export namespace Piece {
    export const EMPTY: SimplePiece = {
        id: "",
        name: "",
        type: PieceType.Simple,
        visibleTo: NO_PLAYERS,
        gameData: {},
        imageId: "",
    }
}