export enum PlayerMoveType {
    Select,
    Write,
    Draw,
}

export default interface PlayerMove {
    actionId: string,
    playerId: string,
    type: PlayerMoveType,
}