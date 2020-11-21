import LocationState from './LocationState';
import Player from '../Player';
import { createReducer, Reducer } from '@reduxjs/toolkit';
import { HasData, HasId } from '../BaseTypes';
import { PieceState } from './PieceState';

// Game flow is a finite state machine.
// We start at the starting stage (state), then actions move us from stage to stage.
// An action can be deemed automatic, which will cause the action to occur without any player input.
// Otherwise, players will choose an action (if there are choices), and the perform the action
// The game is finished when an end stage is reached
export default interface GameState extends HasData, HasId {
    id: string,
    gameId: string,
    allPlayers: Record<string, Player> // Keyed by playerId
    currentStage: string,
    pieceStates: Record<string, PieceState> // Keyed by pieceId    
    locationStates: Record<string, LocationState> // Keyed by locationId
    seed: object | null,
}


export const EMPTY_GAMESTATE: GameState = {
    id: "",
    gameId: "",
    allPlayers: {},
    currentStage: "",
    pieceStates: {},
    locationStates: {},
    seed: null,
    gameData: {}
}

export const reduceGameState: Reducer<GameState> = createReducer(EMPTY_GAMESTATE, builder =>
    builder
)


