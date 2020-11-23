import DataType from '../types/data/DataType';
import Prototype from '../types/Prototype';
import { DataSourceType, Literal, ScriptedDataSource } from '../types/data/DataSource';
import { GameAction } from '../types/Timeline';
import { GameScript } from '../types/Interfaces';
import { LiteralScript } from '../types/Prototype/LiteralScript';
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

function literalScriptToDataSource(name: string, literalScript: LiteralScript): {dataSource: ScriptedDataSource, scripts: GameScript[]} {
    const script = literalScriptToGameScript(name, literalScript)
    
    const argumentDependencies = mapObject(literalScript.arguments, (argument: LiteralScript | Literal, argName: string) => {
        if ("script" in argument){
            return literalScriptToDataSource(argName, argument as LiteralScript)
        } else {
            return {
                dataSource: argument as Literal,
                scripts: [],
            }
        }
    })

    const scripts = Object.values(argumentDependencies).reduce((arr, a) => arr.concat(a.scripts), [] as GameScript[])
    scripts.push(script)

    return{
        dataSource: {
            sourceType: DataSourceType.Function,
            scriptId: script.id,
            arguments: mapObject(argumentDependencies, (a) => a.dataSource),
            returnType: literalScript.returnType
        },
        scripts: scripts
    } 
}

export function literalScriptToAction(name: string, literalScript: LiteralScript, prototype: Prototype): {action: GameAction, prototype: Prototype, scripts: GameScript[]}{
    
    let {dataSource, scripts} = literalScriptToDataSource(name, literalScript)

    let action: GameAction = {
        id: nanoid(),
        name: name,
        newGameState: dataSource,
        automatic: false,
        available: {
            sourceType: DataSourceType.Literal,
            value: "true",
            returnType: DataType.Boolean            
        }
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