import {
    PLUS,
    MINUS
} from '../action/index';

export function count(
    state = 0,
    action
) {
    switch (action.type) {
    case PLUS:
        return state + 1;
    case MINUS:
        return state - 1;
    default:
        return state;
    }
}