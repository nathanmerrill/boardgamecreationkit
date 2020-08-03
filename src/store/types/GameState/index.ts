import LocationState from './LocationState';
import Player from '../Player';
import PlayerMove from './PlayerMove';
import { createReducer, Reducer } from '@reduxjs/toolkit';
import { HasData, HasId } from '../BaseTypes';
import { PieceState } from './PieceState';

// Game flow is as follows:
// The top action of the actionStack is popped to currentAction
// The action is performed. If the action requires a PlayerSelected value, it is added as an available move
// After all values are filled, the action is performed, and the next item on the stack is popped
// Gameplay continues until finished is true or the stack is empty
export default interface GameState extends HasData, HasId {
    id: string,
    gameId: string,
    started: boolean,
    allPlayers: Record<string, Player> // Keyed by playerId
    currentAction: string,
    actionStack: string[] 
    availableMoves: PlayerMove[]
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
    currentAction: "",
    actionStack: [],
    availableMoves: [],
    pieceStates: {},
    locationStates: {},
    finished: false,
    seed: null,
    gameData: {}
}

export const reduceGameState: Reducer<GameState> = createReducer(EMPTY_GAMESTATE, builder =>
    builder
)


