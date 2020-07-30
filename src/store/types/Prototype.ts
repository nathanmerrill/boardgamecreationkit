import { Reducer } from 'redux';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { Game, EMPTY_GAME } from './Game';
import { fillData } from './UserData';
import { DataSet, PieceSet, BoardLocationSet, EMPTY_PIECE_SET, EMPTY_DATASET } from './PrototypeDefs';
import { GameImage } from './BaseTypes';
import { Piece } from './Pieces';


export interface Prototype extends Game {
    allPieceSets: Record<string, PieceSet>
    allLocationSets: Record<string, BoardLocationSet>
    allDataSets: Record<string, DataSet>
}

export const EMPTY_PROTOTYPE: Prototype = {
    ...EMPTY_GAME,
    allDataSets: {},
    allPieceSets: {},
    allLocationSets: {},
}

export const actions = {
    setName: createAction<string>("SET_NAME"),
    setAuthor: createAction<string>("SET_AUTHOR"),
    setDescription: createAction<string>("SET_DESCRIPTION"),
    setPlayerCounts: createAction<number[]>("SET_PLAYER_COUNTS"),
    addPieceSet: createAction("ADD_PIECE_SET", fillData(EMPTY_PIECE_SET, { name: "Piece set" })),
    addDataSet: createAction("ADD_DATA_SET", fillData(EMPTY_DATASET, { name: "Data set" })),
    addImage: createAction<GameImage>("ADD_IMAGE"),
    setDataSet: createAction<DataSet>("ADD_DATA_SET"),
    setPieceSetProps: createAction<Partial<PieceSet>&{id: string}>("SET_PIECE_SET_PROPS"),
    setPieceSetPieceProps: createAction<Partial<Piece>&{id: string}>("SET_PIECE_SET_PIECE_PROPS"),
    setDataSetProps: createAction<Partial<DataSet>&{id: string}>("SET_DATA_SET_PROPS"),
}



export const reducer: Reducer<Prototype> = createReducer(EMPTY_PROTOTYPE, builder =>
    builder
        .addCase(actions.setName, (state, action) => { state.name = action.payload })
        .addCase(actions.setAuthor, (state, action) => { state.authorUsername = action.payload })
        .addCase(actions.setDescription, (state, action) => { state.description = action.payload })
        .addCase(actions.setPlayerCounts, (state, action) => { state.allowedPlayerCounts = action.payload })
        .addCase(actions.addPieceSet, (state, action) => { state.allPieceSets[action.payload.id] = action.payload })
        .addCase(actions.addImage, (state, action) => { state.allImages[action.payload.id] = action.payload })
        .addCase(actions.addDataSet, (state, action) => { state.allDataSets[action.payload.id] = action.payload })
        .addCase(actions.setPieceSetProps, (state, action) => {
            state.allPieceSets[action.payload.id] = {
                ...state.allPieceSets[action.payload.id],
                ...action.payload,
            }
        }).addCase(actions.setPieceSetPieceProps, (state, action) => {
            const pieceSet = state.allPieceSets[action.payload.id]
            const payload = {...action.payload}
            delete payload.id
            state.allPieceSets[action.payload.id] = {
                ...pieceSet,
                piece: {
                    ...pieceSet.piece,
                    ...payload
                }
            }
        })
        .addCase(actions.setDataSetProps, (state, action) => {
            state.allDataSets[action.payload.id] = {
                ...state.allDataSets[action.payload.id],
                ...action.payload,
            }
        })
)
