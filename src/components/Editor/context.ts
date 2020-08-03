import GameAction, { EMPTY_GAME_ACTION } from '../../store/types/GameAction';
import PieceSet, { EMPTY_PIECE_SET } from '../../store/types/Prototype/PieceSet';
import Prototype, { EMPTY_PROTOTYPE, prototypeActions } from '../../store/types/Prototype';
import React from 'react';

export type PrototypeProps =
    Prototype &
    typeof prototypeActions;

export const PrototypeContext = React.createContext<PrototypeProps>({...EMPTY_PROTOTYPE, ...prototypeActions});

export const PieceSetContext = React.createContext<PieceSet>({...EMPTY_PIECE_SET});

export const ActionContext = React.createContext<GameAction>({...EMPTY_GAME_ACTION});