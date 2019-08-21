const { identity } = require('./helper');

module.exports = combineReducers;

function combineReducers(reducerMap) {
    if (reducerMap instanceof Function) {
        return reducerMap;
    }

    if (typeof reducerMap !== 'object') {
        throw new Error('combineReducers() consumes reducers map object!');
    }

    return Object.entries(reducerMap).reduce(
        (combined, [ key, value ]) => {
            const reducer = combineReducers(value);

            if (!reducer) {
                return combined;
            }

            return (state, action) => {
                const newState = combined(state, action);
                const oldValue = newState[key];
                const newValue = reducer(oldValue, action);

                if (oldValue === newState) {
                    return newState;
                }

                return {
                    ...newState,
                    [key]: newValue
                };
            };
        }, identity
    );
}
