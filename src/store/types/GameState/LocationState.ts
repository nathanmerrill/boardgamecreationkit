import { BoardPosition } from '../Piece';
import { LiteralValue } from '../BaseTypes';

export default interface LocationState {
    locationId: string,
    gameData?: Record<string, LiteralValue> // Overrides/extends existing data
    position?: BoardPosition,

}