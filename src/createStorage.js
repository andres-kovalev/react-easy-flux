const React = require('react');
const PropTypes = require('prop-types');
const EventEmitter = require('events');
const hoistStatics = require('hoist-non-react-statics');

const { strictEqual, shallowEqual } = require('./equalityFunctions');
const { identity } = require('./helper');

const { createContext, useContext, useReducer, useRef, useCallback, useMemo, useEffect } = React;

const providerPropTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.any,
    children: PropTypes.node
};

const createEventEmitter = () => new EventEmitter();

const byKey = ([ key1 ], [ key2 ]) => key1.localeCompare(key2);
const takeValue = ([ , value ]) => value;
const getObjectDeps = object => Object.entries(object)
    .sort(byKey)
    .map(takeValue);

const bindActionCreator = dispatch => action => (...payload) => dispatch(action(...payload));

const bindActionCreators = (dispatch) => {
    const bind = bindActionCreator(dispatch);

    return (actionCreatorsMap = {}) => Object
        .entries(actionCreatorsMap)
        .reduce(
            (reduced, [ key, actionCreator ]) => Object.assign(reduced, {
                [key]: bind(actionCreator)
            }), {}
        );
};

module.exports = (reducer, middlewares = []) => {
    const StorageContext = createContext();

    const Provider = ({ state: initialState, children }) => {
        const state = useRef(initialState);
        const getState = useCallback(() => state.current, []);

        const events = useMemo(createEventEmitter, []);
        const subscribe = useCallback((listener) => {
            events.on('change', listener);

            return () => events.off('change', listener);
        }, [ events ]);

        const store = useMemo(() => {
            const actions = [];
            const dispatchActions = () => {
                if (!actions.length) {
                    return;
                }

                const oldState = getState();
                const newState = actions.reduce(
                    (reduced, action) => reducer(reduced, action),
                    oldState
                );
                actions.length = 0;

                if (newState !== oldState) {
                    state.current = newState;

                    events.emit('change');
                }
            };
            const scheduleActions = () => Promise.resolve().then(dispatchActions);
            const dispatchMiddleware = (action) => {
                actions.push(action);

                scheduleActions();
            };
            let dispatch;

            const storage = {
                getState,
                subscribe,
                dispatch: action => dispatch(action)
            };

            dispatch = middlewares
                .reduceRight(
                    (reduced, middleware) => middleware(storage)(reduced),
                    dispatchMiddleware
                );

            return storage;
        }, [ events, getState ]);

        return React.createElement(StorageContext.Provider, { value: store }, children);
    };
    Provider.propTypes = providerPropTypes;

    const useStorage = (selector = identity, equalityFunction = strictEqual) => {
        const { current: stored } = useRef({});
        const { subscribe, getState, dispatch } = useContext(StorageContext);
        const [ , update ] = useReducer(value => value + 1, 0);

        const state = getState();
        if (stored.selector !== selector || stored.state !== state) {
            Object.assign(stored, { state, selector, selected: selector(state) });
        }
        Object.assign(stored, { equalityFunction });

        const check = () => {
            const newState = getState();

            if (state === newState) {
                return;
            }

            const newSelected = stored.selector(newState);

            if (stored.equalityFunction(stored.selected, newSelected)) {
                return;
            }

            Object.assign(stored, { state: newState, selected: newSelected });

            update();
        };
        useEffect(() => subscribe(check), []);

        return [ stored.selected, dispatch ];
    };

    const useActionCreators = (actionCreators = {}) => {
        const { dispatch } = useContext(StorageContext);

        const isArray = Array.isArray(actionCreators);
        const bind = isArray
            ? () => actionCreators.map(bindActionCreator(dispatch))
            : () => bindActionCreators(dispatch)(actionCreators);
        const dependencies = isArray ? actionCreators : getObjectDeps(actionCreators);

        return useMemo(bind, dependencies);
    };

    const Consumer = ({ selector, equalityFunction, actionCreators, children: renderProp }) => {
        const [ selected, dispatch ] = useStorage(selector, equalityFunction);
        const actions = actionCreators
            ? bindActionCreators(dispatch)(actionCreators)
            : dispatch;

        return renderProp(selected, actions);
    };

    const connect = (selector, actionCreators, equalityFunction = shallowEqual) => (Component) => {
        const ConnectedComponent = (props) => {
            const [ stateProps, dispatch ] = useStorage(selector, equalityFunction);
            const actionProps = actionCreators
                ? useActionCreators(actionCreators)
                : { dispatch };

            return (
                <Component { ...props } { ...stateProps } { ...actionProps } />
            );
        };

        hoistStatics(ConnectedComponent, Component);

        ConnectedComponent.WrappedComponent = Component;
        const componentName = Component.displayName || Component.name;
        ConnectedComponent.displayName = componentName ? `connected(${ componentName })` : 'ConnectedComponent';

        return ConnectedComponent;
    };

    return {
        Provider,
        Consumer,
        useStorage,
        useActionCreators,
        connect
    };
};
