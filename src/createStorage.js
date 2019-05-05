const React = require('react');
const PropTypes = require('prop-types');
const EventEmitter = require('events');

const { strictEqual } = require('./equalityFunctions');

const { createContext, useContext, useReducer, useRef, useCallback, useMemo, useEffect } = React;

const providerPropTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.any,
    children: PropTypes.node
};

const createEventEmitter = () => new EventEmitter();
const identity = value => value;

module.exports = (reducer) => {
    const StorageContext = createContext();

    const Provider = ({ state: initialState, children }) => {
        const state = useRef(initialState);
        const getState = useCallback(() => state.current, []);

        const events = useMemo(createEventEmitter, []);
        const subscribe = useCallback((listener) => {
            events.on('change', listener);

            return () => events.off('change', listener);
        }, [ events ]);

        const dispatch = useCallback((action) => {
            const oldState = getState();
            const newState = reducer(oldState, action);

            if (newState !== oldState) {
                state.current = newState;

                events.emit('change');
            }
        }, [ events, getState ]);

        const store = {
            getState,
            subscribe,
            dispatch
        };

        return React.createElement(StorageContext.Provider, { value: store }, children);
    };
    Provider.propTypes = providerPropTypes;

    const useSelector = (selector = identity, equalityFunction = strictEqual) => {
        const { current: stored } = useRef({});
        const { subscribe, getState, dispatch } = useContext(StorageContext);
        const [ , update ] = useReducer(value => value + 1, 0);

        const state = getState();
        if (stored.selector !== selector || stored.state !== state) {
            Object.assign(stored, { state, selector, selected: selector(state) });
        }
        const check = () => {
            const newState = getState();

            if (state === newState) {
                return;
            }

            const newSelected = selector(newState);

            if (equalityFunction(stored.selected, newSelected)) {
                return;
            }

            Object.assign(stored, { state: newState, selected: newSelected });

            update();
        };
        useEffect(() => subscribe(check), []);

        return [ stored.selected, dispatch ];
    };

    const useStorage = equalityFunction => useSelector(undefined, equalityFunction);

    const useActionCreators = (actionCreatorsMap = {}) => {
        const { dispatch } = useContext(StorageContext);

        return Object.entries(actionCreatorsMap)
            .reduce(
                (reduced, [ key, actionCreator ]) => {
                    // eslint-disable-next-line no-param-reassign
                    reduced[key] = payload => dispatch(actionCreator(payload));

                    return reduced;
                }, {}
            );
    };

    return {
        Provider,
        useStorage,
        useSelector,
        useActionCreators
    };
};
