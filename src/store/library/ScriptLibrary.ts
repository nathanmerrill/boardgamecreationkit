import DataType from '../types/data/DataType';
import GameState from '../types/GameState';
import Piece, { BoardLocation } from '../types/entities/Piece';
import { DataSourceType } from '../types/data/DataSource';
import { GameAction } from '../types/Timeline';
import { LiteralScript } from '../types/Prototype/LiteralScript';

export const GameScripts: Record<string, LiteralScript> = {
    MovePiece: {
        returnType: DataType.GameState,
        arguments: {
            pieces: {
                sourceType: DataSourceType.Literal,
                value: "[]",
                returnType: DataType.Pieces,
            },
            location: {
                sourceType: DataSourceType.Literal,
                value: "null",
                returnType: DataType.Location,
            },
        },
        script: ((args: {pieces: Piece[], location: BoardLocation|null}, self: {gameState: GameState, scope: Record<string, string>, action: GameAction} ) => {
            let order = 0
            if (args.location === null){ // Move out of play
                args.pieces.forEach(piece => {
                    let pieceState = self.gameState.pieceStates[piece.id]
                    delete pieceState.inLocationId
                    delete pieceState.order                    
                })
                
            } else {
                const locationId = args.location.id
                order = Object.values(self.gameState.pieceStates).filter((a) => a.inLocationId === locationId).length
                args.pieces.forEach(piece => {
                    let pieceState = self.gameState.pieceStates[piece.id]
                    pieceState.inLocationId = locationId 
                    pieceState.order = order
                    order++             
                })
            } 

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