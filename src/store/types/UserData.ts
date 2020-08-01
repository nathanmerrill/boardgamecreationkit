import { Reducer } from "redux"
import * as Prototype from "./Prototype";
import * as Game from "./Game";
import * as GameState from "./GameState";
import * as Player from "./Player";
import { createReducer, createAction, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { GameScripts, LiteralScript, GameAction } from "./Actions";
import { ValueType, GameScript, DataType, ScriptedValue, LiteralValue, GameValue } from "./BaseTypes";

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

function mapObject<T, U>(object: Record<string, U>, func: (value: U, key: string) => T) : Record<string, T>{
    return Object.keys(object).reduce((record, key) => {
        return {
            ...record,
            key: func(object[key], key)
        }
    }, {})
}

function literalScriptToGameScript(name: string, literalScript: LiteralScript): GameScript {
    return {
        id: nanoid(),
        script: literalScript.script,
        returnType: literalScript.returnType,
        name: name,
        parameters: mapObject(literalScript.arguments, (value, key) => value.returnType)
    }
}

function literalScriptToScriptedValue(name: string, literalScript: LiteralScript): {value: ScriptedValue, scripts: GameScript[]} {
    const script = literalScriptToGameScript(name, literalScript)
    
    const argumentDependencies = mapObject(literalScript.arguments, (argument: LiteralScript | LiteralValue, argName: string) => {
        if ("script" in argument){
            return literalScriptToScriptedValue(argName, argument as LiteralScript)
        } else {
            return {
                value: argument as LiteralValue,
                scripts: [],
            }
        }
    })

    const scripts = Object.values(argumentDependencies).reduce((arr, a) => arr.concat(a.scripts), [] as GameScript[])
    scripts.push(script)

    return{
        value: {
            type: ValueType.Function,
            scriptId: script.id,
            arguments: mapObject(argumentDependencies, (a) => a.value),
            returnType: literalScript.returnType
        },
        scripts: scripts
    } 
}

function literalScriptToAction(name: string, literalScript: LiteralScript, prototype: Prototype.Prototype): {action: GameAction, prototype: Prototype.Prototype, scripts: GameScript[]}{
    
    let {value, scripts} = literalScriptToScriptedValue(name, literalScript)

    let action: GameAction = {
        id: nanoid(),
        name: name,
        value: value
    }

    return {
        action: action,
        prototype: {
            ...prototype,
            allActions: {
                ...prototype.allActions,
                [action.id]: action
            },
            allScripts: {
                ...prototype.allScripts,
                ...scripts.reduce((record, value) => {
                    record[value.id] = value
                    return record
                }, {} as Record<string, GameScript>)
            }
        },
        scripts: scripts,
    }
}

export const actions = {
    newPrototype: createAction("NEW_PROTOTYPE", () => {
        const prototype = {
            ...Prototype.EMPTY_PROTOTYPE,
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