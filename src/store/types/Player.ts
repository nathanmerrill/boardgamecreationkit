import { Nameable, HasData } from "./BaseTypes";

export enum WinStatus {
    Won,
    Lost,
    Undetermined
}

export interface Player extends Nameable, HasData {
    position: number,
    pieceIds: string[],
    username: string,
    winStatus: WinStatus,
    score: number | null,
}