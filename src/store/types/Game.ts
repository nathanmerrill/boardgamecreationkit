import { Nameable, GameImage } from "./BaseTypes";
import { Piece, PieceSide, BoardLocation } from "./Pieces";
import { GameAction } from "./Actions";
import { GameState, EMPTY_GAMESTATE } from "./GameState";
import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";

// Data that does not change during gameplay
export interface Game extends Nameable {
    description: string,
    authorUsername: string,
    updatedAt: string,
    allowedPlayerCounts: number[],
    initialState: GameState,

    allPieces: Record<string, Piece>
    allActions: Record<string, GameAction>
    allSides: Record<string, PieceSide>
    allLocations: Record<string, BoardLocation>
    allImages: Record<string, GameImage>
}

export const EMPTY_GAME: Game = {
    id: "",
    name: "",
    description: "",
    authorUsername: "",
    updatedAt: "",
    allowedPlayerCounts: [],
    initialState: EMPTY_GAMESTATE,

    allPieces: {},
    allActions: {},
    allSides: {},
    allLocations: {},
    allImages: {},
}

export const reducer: Reducer<Game> = createReducer(EMPTY_GAME, builder =>
    builder
)