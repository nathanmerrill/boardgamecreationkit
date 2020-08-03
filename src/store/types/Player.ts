import { HasData, Nameable } from './BaseTypes';

export enum WinStatus {
    Won,
    Lost,
    Undetermined
}

export default interface Player extends Nameable, HasData {
    position: number,
    pieceIds: string[],
    username: string,
    winStatus: WinStatus,
    score: number | null,
}