const React = require('react');

const { useState } = React;
const { mount } = require('enzyme');
const { act } = require('react-dom/test-utils');

const createStorage = require('../src/createStorage');

const identity = value => value;

describe('createStorage', () => {
    it.each([ 'Provider', 'Consumer', 'useStorage', 'useActionCreators' ])('should return %s', (field) => {
        const result = createStorage(identity);

        expect(result).toHaveProperty(field);
    });

    describe('useStorage()', () => {
        it('should return storage value', () => {
            const state = 'state-value';
            const { Provider, useStorage } = createStorage(identity);
            const Consumer = () => {
                const [ value ] = useStorage();

                return (
                    <div>{ value }</div>
                );
            };

            const wrapper = mount(
                <Provider state={ state }>
                    <Consumer />
                </Provider>
            );
            const div = wrapper.find('div');

            expect(div.text()).toBe(state);
        });

        it('should return selected part of storage value when selector provided', () => {
            const value1 = 'value-1';
            const value2 = 'value-2';
            const { Provider, useStorage } = createStorage(identity);
            const Consumer = () => {
                const [ value ] = useStorage(
                    state => state.value1
                );

                return (
                    <div>{ value }</div>
                );
            };

            const wrapper = mount(
                <Provider state={{ value1, value2 }}>
                    <Consumer />
                </Provider>
            );
            const div = wrapper.find('div');

            expect(div.text()).toBe(value1);
        });

        it('should return storage dispatch() function', () => {
            const reducer = jest.fn();
            const action = { type: 'ACTION_TYPE' };
            const { Provider, useStorage } = createStorage(reducer);
            const Consumer = () => {
                const [ , dispatch ] = useStorage();
                const onClick = () => dispatch(action);

                return (
                    <button onClick={ onClick } />
                );
            };

            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );
            const button = wrapper.find('button');
            button.simulate('click');

            expect(reducer).toHaveBeenCalledWith(expect.anything(), action);
        });

        it('shouldn\'t cause component re-render when state didn\'t changed', () => {
            const { Provider, useStorage } = createStorage(identity);
            const Consumer = jest.fn(() => {
                const [ , dispatch ] = useStorage();
                const onClick = () => dispatch({});

                return (
                    <button onClick={ onClick } />
                );
            });
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );

            expect(Consumer).toHaveBeenCalledTimes(1);

            const button = wrapper.find('button');
            button.simulate('click');

            expect(Consumer).toHaveBeenCalledTimes(1);
        });

        it('should use equality function to check state changes when provided', () => {
            let value1 = 0;
            const reducer = () => {
                value1 += 1;

                return { value1, value2: 0 };
            };
            const { Provider, useStorage } = createStorage(reducer);
            const Consumer = jest.fn(() => {
                const [ , dispatch ] = useStorage(
                    identity,
                    (oldState, newState) => oldState.value2 === newState.value2
                );
                const onClick = () => dispatch({});

                return (
                    <button onClick={ onClick } />
                );
            });
            const wrapper = mount(
                <Provider state={ reducer() }>
                    <Consumer />
                </Provider>
            );

            expect(Consumer).toHaveBeenCalledTimes(1);

            const button = wrapper.find('button');
            button.simulate('click');

            expect(Consumer).toHaveBeenCalledTimes(1);
        });
    });

    describe('useActionCreators()', () => {
        it('should return action creators map bound to dispatch', () => {
            const reducer = jest.fn();
            const action = { type: 'ACTION_TYPE' };
            const invoke = () => action;

            const { Provider, useActionCreators } = createStorage(reducer);
            const Consumer = () => {
                const { invoke: onClick } = useActionCreators({ invoke });

                return (
                    <button onClick={ onClick } />
                );
            };
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );
            const button = wrapper.find('button');
            button.simulate('click');

            expect(reducer).toHaveBeenCalledWith(expect.anything(), action);
        });

        it('shouldn\'t throw an error even when called without arguments', () => {
            const { Provider, useActionCreators } = createStorage(identity);
            const Consumer = () => {
                useActionCreators();

                return (
                    <div>ok</div>
                );
            };
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );
            const div = wrapper.find('div');

            expect(div).toHaveLength(1);
        });

        it('shouldn\'t cause component re-render when storage updated', () => {
            let state = 0;
            const reducer = () => {
                state += 1;

                return state;
            };

            const { Provider, useActionCreators } = createStorage(reducer);
            const Consumer = jest.fn(() => {
                const { update } = useActionCreators({ update: () => {} });

                return (
                    <button onClick={ update } />
                );
            });
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );

            expect(Consumer).toHaveBeenCalledTimes(1);

            const button = wrapper.find('button');
            button.simulate('click');

            expect(Consumer).toHaveBeenCalledTimes(1);
        });

        it('should memoize bound action creators', () => {
            const { Provider, useActionCreators } = createStorage(identity);
            const ACTIONS = {
                action1: () => {},
                action2: () => {}
            };

            const Child = () => <React.Fragment />;
            const Consumer = () => {
                const actions = useActionCreators(ACTIONS);
                const [ , update ] = useState();

                return (
                    <Child { ...actions } update={ update } />
                );
            };
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );
            const props1 = wrapper.find(Child).props();
            act(() => {
                props1.update(null);
            });
            wrapper.update();
            const props2 = wrapper.find(Child).props();

            expect(props1).toEqual(props2);
        });
    });

    describe('Consumer', () => {
        it('should call children render prop with storage value', () => {
            const state = 'state-value';
            const renderFunction = jest.fn(() => null);

            const { Provider, Consumer } = createStorage(identity);
            mount(
                <Provider state={ state }>
                    <Consumer>
                        {renderFunction}
                    </Consumer>
                </Provider>
            );

            expect(renderFunction).toHaveBeenCalledWith(state, expect.anything());
        });

        it('should call children render prop with part of storage value when selector provided', () => {
            const value1 = 'value-1';
            const value2 = 'value-2';
            const selector = state => state.value1;
            const renderFunction = jest.fn(() => null);

            const { Provider, Consumer } = createStorage(identity);
            mount(
                <Provider state={{ value1, value2 }}>
                    <Consumer selector={ selector }>
                        {renderFunction}
                    </Consumer>
                </Provider>
            );

            expect(renderFunction).toHaveBeenCalledWith(value1, expect.anything());
        });

        it('should call children render prop with store dispatch() function', () => {
            const reducer = jest.fn();
            const action = { type: 'ACTION_TYPE' };

            const { Provider, Consumer } = createStorage(reducer);
            const ConsumerComponent = () => (
                <Consumer>
                    {(value, dispatch) => {
                        const onClick = () => dispatch(action);

                        return (
                            <button onClick={ onClick } />
                        );
                    }}
                </Consumer>
            );
            const wrapper = mount(
                <Provider state={ 0 }>
                    <ConsumerComponent />
                </Provider>
            );
            const button = wrapper.find('button');
            button.simulate('click');

            expect(reducer).toHaveBeenCalledWith(expect.anything(), action);
        });

        it('shouldn\'t cause component re-render when state didn\'t changed', () => {
            const renderFunction = jest.fn((value, dispatch) => {
                const onClick = () => dispatch({});

                return (
                    <button onClick={ onClick } />
                );
            });

            const { Provider, Consumer } = createStorage(identity);
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer>
                        {renderFunction}
                    </Consumer>
                </Provider>
            );

            expect(renderFunction).toHaveBeenCalledTimes(1);

            const button = wrapper.find('button');
            button.simulate('click');

            expect(renderFunction).toHaveBeenCalledTimes(1);
        });

        it('should use equality function to check state changes when provided', () => {
            let value1 = 0;
            const reducer = () => {
                value1 += 1;

                return { value1, value2: 0 };
            };
            const renderFunction = jest.fn((value, dispatch) => {
                const onClick = () => dispatch({});

                return (
                    <button onClick={ onClick } />
                );
            });
            const equalityFunction = (oldState, newState) => oldState.value2 === newState.value2;

            const { Provider, Consumer } = createStorage(reducer);
            const wrapper = mount(
                <Provider state={ reducer() }>
                    <Consumer equalityFunction={ equalityFunction }>
                        {renderFunction}
                    </Consumer>
                </Provider>
            );

            expect(renderFunction).toHaveBeenCalledTimes(1);

            const button = wrapper.find('button');
            button.simulate('click');

            expect(renderFunction).toHaveBeenCalledTimes(1);
        });

        it('should call children render prop with bound action creators bound to dispatch when provided', () => {
            const reducer = jest.fn();
            const action = { type: 'ACTION_TYPE' };
            const invoke = () => action;
            const renderFunction = jest.fn(() => null);

            const { Provider, Consumer } = createStorage(reducer);
            mount(
                <Provider state={ 0 }>
                    <Consumer actionCreators={{ invoke }}>
                        {renderFunction}
                    </Consumer>
                </Provider>
            );

            expect(renderFunction).toHaveBeenCalled();

            const [ firstCall ] = renderFunction.mock.calls;
            const [ , actionCreatorsMap ] = firstCall;
            act(() => {
                actionCreatorsMap.invoke();
            });

            expect(reducer).toHaveBeenCalledWith(expect.anything(), action);
        });
    });

    describe('dispatch()', () => {
        it('should run middlewares when provided', () => {
            const reducer = jest.fn();
            const exampleAction = { type: 'ACTION_TYPE' };
            const middlewareSpy = jest.fn();
            const middleware = () => next => (action) => {
                middlewareSpy(action);

                next(action);
            };

            const { Provider, useStorage } = createStorage(reducer, [ middleware ]);
            const Consumer = () => {
                const [ , dispatch ] = useStorage();
                const onClick = () => dispatch(exampleAction);

                return (
                    <button onClick={ onClick } />
                );
            };
            const wrapper = mount(
                <Provider state={ 0 }>
                    <Consumer />
                </Provider>
            );
            const button = wrapper.find('button');
            button.simulate('click');

            expect(middlewareSpy).toHaveBeenCalledWith(exampleAction);
        });
    });
});
