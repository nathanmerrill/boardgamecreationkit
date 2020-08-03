import GameAction from '../types/GameAction';
import GameState from '../types/GameState';
import Piece, { BoardLocation } from '../types/Piece';
import { DataType, GameValueType, LiteralScript } from '../types/BaseTypes';

export const GameScripts: Record<string, LiteralScript> = {
    If: {
        returnType: DataType.GameState,
        arguments: {
            condition: {
                type: GameValueType.Literal,
                value: "true",
                returnType: DataType.Boolean,
            },
            trueAction: {
                type: GameValueType.Literal,
                value: "null",
                returnType: DataType.Action,
            },
            falseAction: {
                type: GameValueType.Literal,
                value: "null",
                returnType: DataType.Action
            }
        },
        script: ((args: {condition: boolean, trueAction: GameAction|null, falseAction: GameAction|null}, self: {gameState: GameState}) => {
            if (args.condition){
                if (args.trueAction !== null){
                    self.gameState.actionStack.push(args.trueAction.id)
                }
            } else {
                if (args.falseAction !== null){
                    self.gameState.actionStack.push(args.falseAction.id)
                }
            }
            return self.gameState
        }).toString(),
    },
    Multistep: {
        returnType: DataType.GameState,
        arguments: {
            steps: {
                type: GameValueType.Literal,
                value: "[]",
                returnType: DataType.Actions,
            },
            repeat: {
                type: GameValueType.Literal,
                value: "false",
                returnType: DataType.Boolean,
            },
        },
        script: ((args: {steps: GameAction[], repeat: boolean}, self: {gameState: GameState, scope: Record<string, string>, action: GameAction} ) => {

            if (!self.scope["first"] || args.repeat){
                const stepIds = args.steps.map(s => s.id)
                self.gameState.actionStack = self.gameState.actionStack.concat(stepIds)
                self.gameState.actionStack.push(self.action.id)

                self.scope["first"] = "false"
            }

            return self.gameState

        }).toString(),        
    },
    MovePiece: {
        returnType: DataType.GameState,
        arguments: {
            pieces: {
                type: GameValueType.Literal,
                value: "[]",
                returnType: DataType.Pieces,
            },
            location: {
                type: GameValueType.Literal,
                value: "null",
                returnType: DataType.Location,
            },
        },
        script: ((args: {pieces: Piece[], location: BoardLocation|null}, self: {gameState: GameState, scope: Record<string, string>, action: GameAction} ) => {
            let order = 0            
            const locationId  = args.location === null ? null : args.location.id
            if (args.location){
                order = Object.values(self.gameState.pieceStates).filter((a) => a.inLocationId === locationId).length
            }
            args.pieces.forEach(piece => {
                let pieceState = self.gameState.pieceStates[piece.id]
                if (!locationId && pieceState.inLocationId){
                    delete pieceState.inLocationId
                } else if (locationId){
                    pieceState.inLocationId = locationId 
                }
                pieceState.order = order
                order++             
            })

            return self.gameState

        }).toString(),        
    },
    AllPlayers: {
        returnType: DataType.Players,
        arguments: {},
        script: ((self: {gameState: GameState}) => {
            return Object.keys(self.gameState.allPlayers)
        }).toString()
    }    
}

export default GameScripts