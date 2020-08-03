import Game from './types/Game';
import GameScripts from './library/ScriptLibrary';
import GameState, { reduceGameState } from './types/GameState';
import Player from './types/Player';
import Prototype, { EMPTY_PROTOTYPE, reducePrototype } from './types/Prototype';
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { literalScriptToAction } from './library/lib';
import { Reducer } from 'redux';

export const actions = {
    newPrototype: createAction("NEW_PROTOTYPE", () => {
        const prototype = {
            ...EMPTY_PROTOTYPE,
            id: nanoid(),
            authorUsername: "Unnamed", 
            name: "Untitled", 
            allowedPlayerCounts: [2],
        }
        const rootAction = literalScriptToAction("root", GameScripts.Multistep, prototype)
        return {
            payload: {
                ...rootAction.prototype,
                rootAction: rootAction.action.id,
                allActions: {
                    [rootAction.action.id]: rootAction.action
                }
            }
        }
    }),
    deletePrototype: createAction<string>("DELETE_PROTOTYPE"),
    startGame: createAction("START_GAME", (game: Game, players: Player[]) => {
        return {
            payload: {
                ...game.initialState,
                id: nanoid(),
                gameInstanceId: nanoid(),
                gameId: game.id,
                allPlayers: players.reduce(function (obj: Record<string, Player>, player) {
                    obj[player.id] = player
                    return obj
                }, {})
            }
        }
    }),
    importGame: createAction<Game>("IMPORT_GAME"),
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
                    let newPrototype = reducePrototype(prototype, action);
                    state.prototypes[action.meta.applicationPrototypeId] = newPrototype;
                    return state;
                }

                if ("applicationGameInstanceId" in action.meta) {
                    let gameState = state.gameInstances[action.meta.applicationGameInstanceId];
                    let newGameState = reduceGameState(gameState, action);
                    state.gameInstances[action.meta.applicationGameInstanceId] = newGameState;
                    return state;
                }
            }
            return state;
        })
)

export interface UserData {
    prototypes: Record<string, Prototype>, // Prototypes the player is working on
    gameInstances: Record<string, GameState>, // Active games the player is playing
    games: Record<string, Game>, // All games known to the player. Before starting new game, ensure hashes match
}