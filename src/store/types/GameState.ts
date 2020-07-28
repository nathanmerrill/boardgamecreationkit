import { HasData, Visible, HasId } from "./BaseTypes";
import { Player } from "./Player";
import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";

export interface PieceState {
    pieceId: string,
}

export interface PieceDataState extends PieceState, HasData { }
export interface PieceVisibilityState extends PieceState, Visible { }

export interface PieceSideState extends PieceState {
    sideId: string | null,
}

export interface CollectionSizeState extends PieceState {
    sizeVisibleTo: string, //Player ID
}

export interface PieceLocationState extends PieceState {
    locationId: string,
    order: number,
}

export interface PieceCollectionState extends PieceState {
    collectionId: string,
    order: number,
}

export interface PieceOwnerState extends PieceState {
    ownerId: string,
}

export interface PieceDrawingState extends PieceState {
    drawing: object,
}

export interface PieceTextState extends PieceState {
    text: string,
}

export interface PieceTimerState extends PieceState {
    endsAt: Date,
}

export interface PlayerState extends HasData {
    playerId: string,
}

export interface LocationState extends HasData {
    locationId: string,
}

// Game flow is as follows:
// If there are any remaining queuedActions, they are performed first.  These actions will modify the game state
// Then players are able to move.  
// Player moves that involve additional actions will add additional queuedActions and will be immediately performed before other player actions
// Gameplay continues until finished is true

export interface GameState extends HasData, HasId {
    id: string,
    gameId: string,
    started: boolean,
    allPlayers: Record<string, Player> // Keyed by playerId
    queuedActions: string[] // All remaining actions to perform
    availableMoves: string[] // All possible moves available to all players
    pieceStates: Record<string, PieceState> // Keyed by pieceId    
    locationStates: Record<string, LocationState> // Keyed by locationId
    finished: boolean,
    seed: object | null,
}


export const EMPTY_GAMESTATE: GameState = {
    id: "",
    gameId: "",
    started: false,
    allPlayers: {},
    queuedActions: [],
    availableMoves: [],
    pieceStates: {},
    locationStates: {},
    finished: false,
    seed: null,
    gameData: {}
}

export const reducer: Reducer<GameState> = createReducer(EMPTY_GAMESTATE, builder =>
    builder
)


