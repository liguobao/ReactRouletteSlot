import produce from 'immer';
import { handleActions } from 'redux-actions';

export function handleActionsImmer(draftReducerMap, initialValue) {
    return produce((draft, action) =>
        handleActions(draftReducerMap, initialValue)(draft, action)
    );
}
