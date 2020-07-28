import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as Prototype from '../../store/types/Prototype';
import { ApplicationState } from '../../store';
import { ActionCreatorWithPayload, createAction, bindActionCreators } from '@reduxjs/toolkit';

export type PrototypeProps =
    Prototype.Prototype &
    typeof Prototype.actions &
    RouteComponentProps<{ subpage: string | undefined, prototypeid: string }>;

function scopeAction<P, T extends string>(actionCreator: ActionCreatorWithPayload<P, T>, scope: Record<string, any>): ActionCreatorWithPayload<P, T> {
    const creator = createAction(actionCreator.type, (payload: P) => {
        const action = {
            meta: {
                ...scope,
            },
            ...actionCreator(payload),
        };

        return action;
    });

    return creator;
}

function scopeActions<T extends Record<string, any>>(actions: T, scope: Record<string, any>): T {
    let newObject: any = {};
    Object.keys(actions).forEach((key: string) => {
        newObject[key] = scopeAction(actions[key], scope);
    });

    return newObject as T;
}

export function prototypeConnect() {
    return connect(
        (state: ApplicationState, ownProps: any) => {
            return state.userData.prototypes[ownProps.match.params.prototypeid]
        },
        (dispatch, ownProps) => {
            const scope = {
                applicationPrototypeId: ownProps.match.params.prototypeid
            };

            var scopedActionCreators = scopeActions(Prototype.actions, scope);

            return bindActionCreators(scopedActionCreators, dispatch);
        }
    )
}