import GameImage from './GameImage';
import GameState, { EMPTY_GAMESTATE } from '../GameState';
import Piece, { BoardLocation, BoardPiece, PieceSide, SidedPiece } from './Piece';
import { createReducer } from '@reduxjs/toolkit';
import { GameAction, GamePhase } from '../Timeline';
import { GameScript, Nameable } from '../Interfaces';
import { Reducer } from 'redux';

// Data that does not change during gameplay
export default interface Game extends Nameable {
    description: string,
    authorUsername: string,
    updatedAt: string,
    allowedPlayerCounts: number[],
    initialState: GameState,
    startPhase: string,

    allPhases: Record<string, GamePhase>
    allPieces: Record<string, Piece>
    allActions: Record<string, GameAction>
    allSides: Record<string, PieceSide>
    allLocations: Record<string, BoardLocation>
    allImages: Record<string, GameImage>
    allScripts: Record<string, GameScript>
}
    
export const EMPTY_GAME: Game = {
    id: "",
    name: "",
    description: "",
    authorUsername: "",
    updatedAt: "",
    startPhase: "",
    allowedPlayerCounts: [],
    initialState: EMPTY_GAMESTATE,

    allPhases: {},
    allPieces: {},
    allActions: {},
    allSides: {},
    allLocations: {},
    allImages: {},
    allScripts: {},
}

export const reducer: Reducer<Game> = createReducer(EMPTY_GAME, builder =>
    builder
)