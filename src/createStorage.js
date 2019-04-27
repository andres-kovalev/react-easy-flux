const React = require('react');
const PropTypes = require('prop-types');

const { createContext, useContext, useReducer } = React;

const providerPropTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.any,
    children: PropTypes.node
};

module.exports = (reducer) => {
    const StorageContext = createContext();

    const Provider = ({ state: initialState, children }) => {
        const context = useReducer(reducer, initialState);

        return React.createElement(StorageContext.Provider, { value: context }, children);
    };
    Provider.propTypes = providerPropTypes;

    const useStorage = () => useContext(StorageContext);

    const useActionCreators = (actionCreatorsMap = {}) => {
        const [ , dispatch ] = useContext(StorageContext);

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
        useActionCreators
    };
};
