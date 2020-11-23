import { BoardLocation, BoardPiece } from '../entities/Piece';
import { Literal } from '../data/DataSource';

export default interface LocationState {
    locationId: string,
    gameData?: Record<string, Literal> // Overrides/extends existing data
    position?: BoardLocation,

}