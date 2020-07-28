import * as UserData from "./types/UserData";

export const reducers = {
    userData: UserData.reducer,
}

export function saveState(state: ApplicationState) {
    localStorage.setItem("userdata", JSON.stringify(state.userData));
}

export function loadState(): ApplicationState | undefined {
    try {
        const s = localStorage.getItem("userdata");
        if (s == null) {
            return;
        }

        return {
            userData: JSON.parse(s)
        }
    } catch (e) {
    }
}


export interface ApplicationState {
    userData: UserData.UserData,
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
