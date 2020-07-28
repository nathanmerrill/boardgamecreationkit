import { Reducer } from 'redux';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { Piece, EMPTY_PIECE, PieceType } from './Pieces';
import { Game, EMPTY_GAME } from './Game';
import { fillData } from './UserData';


export interface Prototype extends Game {
    allPieceSets: Record<string, Piece>
    allLocationSets: Record<string, Piece>
}

export const EMPTY_PROTOTYPE: Prototype = {
    ...EMPTY_GAME,
    allPieceSets: {},
    allLocationSets: {},
}

export const actions = {
    setName: createAction<string>("SET_NAME"),
    setAuthor: createAction<string>("SET_AUTHOR"),
    setDescription: createAction<string>("SET_DESCRIPTION"),
    addPiece: createAction("ADD_PIECE", fillData(EMPTY_PIECE, { name: "Token", type: PieceType.Simple })),
    setPlayerCounts: createAction<number[]>("SET_PLAYER_COUNTS"),
}



export const reducer: Reducer<Prototype> = createReducer(EMPTY_PROTOTYPE, builder =>
    builder
        .addCase(actions.setName, (state, action) => { state.name = action.payload })
        .addCase(actions.setAuthor, (state, action) => { state.authorUsername = action.payload })
        .addCase(actions.setDescription, (state, action) => { state.description = action.payload })
        .addCase(actions.setPlayerCounts, (state, action) => { state.allowedPlayerCounts = action.payload })
        .addCase(actions.addPiece, (state, action) => { state.allPieces[action.payload.id] = action.payload })
)
