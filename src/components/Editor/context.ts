import React from "react";
import { EMPTY_PROTOTYPE } from "../../store/types/Prototype";
import * as Prototype from '../../store/types/Prototype';
import { EMPTY_PIECE_SET, PieceSet } from "../../store/types/PrototypeDefs";

export type PrototypeProps =
    Prototype.Prototype &
    typeof Prototype.actions;

export const PrototypeContext = React.createContext<PrototypeProps>({...EMPTY_PROTOTYPE, ...Prototype.actions});

export const PieceSetContext = React.createContext<PieceSet>({...EMPTY_PIECE_SET});