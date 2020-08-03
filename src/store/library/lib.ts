import GameAction from '../types/GameAction';
import Prototype from '../types/Prototype';
import {
    GameScript,
    GameValueType,
    LiteralScript,
    LiteralValue,
    ScriptedValue
    } from '../types/BaseTypes';
import { mapObject } from '../../lib';
import { nanoid } from '@reduxjs/toolkit';

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
            type: GameValueType.Function,
            scriptId: script.id,
            arguments: mapObject(argumentDependencies, (a) => a.value),
            returnType: literalScript.returnType
        },
        scripts: scripts
    } 
}

export function literalScriptToAction(name: string, literalScript: LiteralScript, prototype: Prototype): {action: GameAction, prototype: Prototype, scripts: GameScript[]}{
    
    let {value, scripts} = literalScriptToScriptedValue(name, literalScript)

    let action: GameAction = {
        id: nanoid(),
        name: name,
        newGameState: value
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