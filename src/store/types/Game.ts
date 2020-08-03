import GameAction from './GameAction';
import GameImage from './GameImage';
import GameState, { EMPTY_GAMESTATE } from './GameState';
import Piece, { BoardLocation, PieceSide } from './Piece';
import { createReducer } from '@reduxjs/toolkit';
import { GameScript, Nameable } from './BaseTypes';
import { Reducer } from 'redux';

// Data that does not change during gameplay
export default interface Game extends Nameable {
    description: string,
    authorUsername: string,
    updatedAt: string,
    allowedPlayerCounts: number[],
    initialState: GameState,
    rootAction: string,

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
    rootAction: "",
    allowedPlayerCounts: [],
    initialState: EMPTY_GAMESTATE,

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