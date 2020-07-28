import { Reducer } from "redux"
import * as Prototype from "./Prototype";
import * as Game from "./Game";
import * as GameState from "./GameState";
import * as Player from "./Player";
import { createReducer, createAction, nanoid } from "@reduxjs/toolkit"

export function fillData<T>(emptyType: T, data: Partial<T> = {}) {
    return () => {
        return {
            payload: {
                ...emptyType,
                id: nanoid(),
                ...data
            }
        }
    }
}

export const actions = {
    newPrototype: createAction("NEW_PROTOTYPE", fillData(Prototype.EMPTY_PROTOTYPE, { authorUsername: "Unnamed", name: "Untitled", allowedPlayerCounts: [2]})),
    deletePrototype: createAction<string>("DELETE_PROTOTYPE"),
    startGame: createAction("START_GAME", (game: Game.Game, players: Player.Player[]) => {
        return {
            payload: {
                ...game.initialState,
                id: nanoid(),
                gameInstanceId: nanoid(),
                gameId: game.id,
                allPlayers: players.reduce(function (obj: Record<string, Player.Player>, player) {
                    obj[player.id] = player
                    return obj
                }, {})
            }
        }
    }),
    importGame: createAction<Game.Game>("IMPORT_GAME"),
}

const EMPTY_USER_DATA: UserData = {
    prototypes: {},
    gameInstances: {},
    games: {}
}


export const reducer: Reducer<UserData> = createReducer(EMPTY_USER_DATA, builder =>
    builder
        .addCase(actions.newPrototype, (state, action) => {
            state.prototypes[action.payload.id] = action.payload;
        })
        .addCase(actions.deletePrototype, (state, action) => { delete state.prototypes[action.payload] })
        .addCase(actions.startGame, (state, action) => { state.gameInstances[action.payload.id] = action.payload })
        .addCase(actions.importGame, (state, action) => { state.games[action.payload.id] = action.payload })
        .addDefaultCase((state, action) => {
            if ("meta" in action) {
                if ("applicationPrototypeId" in action.meta) {
                    let prototype = state.prototypes[action.meta.applicationPrototypeId];
                    let newPrototype = Prototype.reducer(prototype, action);
                    state.prototypes[action.meta.applicationPrototypeId] = newPrototype;
                    return state;
                }

                if ("applicationGameInstanceId" in action.meta) {
                    let gameState = state.gameInstances[action.meta.applicationGameInstanceId];
                    let newGameState = GameState.reducer(gameState, action);
                    state.gameInstances[action.meta.applicationGameInstanceId] = newGameState;
                    return state;
                }
            }
            return state;
        })
)

export interface UserData {
    prototypes: Record<string, Prototype.Prototype>, // Prototypes the player is working on
    gameInstances: Record<string, GameState.GameState>, // Active games the player is playing
    games: Record<string, Game.Game>, // All games known to the player. Before starting new game, ensure hashes match
}