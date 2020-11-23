import BoardLocationSet from './BoardLocationSet';
import Game, { EMPTY_GAME } from '../entities/Game';
import GameImage from '../entities/GameImage';
import Piece from '../entities/Piece';
import PieceSet, { EMPTY_PIECE_SET } from './PieceSet';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { fillData } from '../../../lib';
import { GameAction } from '../Timeline';
import { Reducer } from 'redux';


export default interface Prototype extends Game {
    allPieceSets: Record<string, PieceSet>
    allLocationSets: Record<string, BoardLocationSet>
}

export const EMPTY_PROTOTYPE: Prototype = {
    ...EMPTY_GAME,
    allPieceSets: {},
    allLocationSets: {},
}

const actions = {
    setName: createAction<string>("SET_NAME"),
    setAuthor: createAction<string>("SET_AUTHOR"),
    setDescription: createAction<string>("SET_DESCRIPTION"),
    setPlayerCounts: createAction<number[]>("SET_PLAYER_COUNTS"),
    addPieceSet: createAction("ADD_PIECE_SET", fillData(EMPTY_PIECE_SET, { name: "Piece set" })),
    addImage: createAction<GameImage>("ADD_IMAGE"),
    setPieceSetProps: createAction<Partial<PieceSet>&{id: string}>("SET_PIECE_SET_PROPS"),
    setPieceSetPieceProps: createAction<Partial<Piece>&{id: string}>("SET_PIECE_SET_PIECE_PROPS"),
    setActionProps: createAction<Partial<GameAction>&{id: string}>("SET_ACTION_PROPS"),
}

export const prototypeActions = actions

export const reducePrototype: Reducer<Prototype> = createReducer(EMPTY_PROTOTYPE, builder =>
    builder
        .addCase(actions.setName, (state, action) => { state.name = action.payload })
        .addCase(actions.setAuthor, (state, action) => { state.authorUsername = action.payload })
        .addCase(actions.setDescription, (state, action) => { state.description = action.payload })
        .addCase(actions.setPlayerCounts, (state, action) => { state.allowedPlayerCounts = action.payload })
        .addCase(actions.addPieceSet, (state, action) => { state.allPieceSets[action.payload.id] = action.payload })
        .addCase(actions.addImage, (state, action) => { state.allImages[action.payload.id] = action.payload })
        .addCase(actions.setPieceSetProps, (state, action) => {
            state.allPieceSets[action.payload.id] = {
                ...state.allPieceSets[action.payload.id],
                ...action.payload,
            }
        }).addCase(actions.setPieceSetPieceProps, (state, action) => {
            const pieceSet: PieceSet = state.allPieceSets[action.payload.id]
            const payload: Partial<Piece> = {...action.payload}
            delete payload.id
            state.allPieceSets[action.payload.id] = {
                ...pieceSet,
                piece: {
                    ...pieceSet.piece as any,
                    ...payload,
                }
            }
        })
        .addCase(actions.setActionProps, (state, action) => { state.allActions[action.payload.id] = {
            ...state.allActions[action.payload.id],
            ...action.payload
        }})
)
