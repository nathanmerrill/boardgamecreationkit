export interface PieceState {
    pieceId: string,
    sideId?: string | null,
    inLocationId?: string,
    inCollectionId?: string, 
    order?: number, //Order of piece within collection or location
    ownerId?: string,
    drawing?: object, // DrawingPiece
    text?: string, //TextPiece
    endsAt?: Date, // TimerPiece
    visibleTo?: string[], // Player IDs in addition to existing visibility condition
    sizeVisibleTo?: string[],
    gameData?: Record<string, PieceState> // Overrides/extends existing data
}