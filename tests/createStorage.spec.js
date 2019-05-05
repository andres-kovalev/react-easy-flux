const React = require('react');
const { mount } = require('enzyme');

const createStorage = require('../src/createStorage');

const identity = value => value;

describe('createStorage', () => {
    it.each([ 'Provider', 'useStorage', 'useSelector', 'useActionCreators' ])('should return %s', (field) => {
        const result = createStorage(identity);

        expect(result).toHaveProperty(field);
    });

    it('should return useStorage() hook to consume Provider\'s context', () => {
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

    it('should return useStorage() hook to get store dispatch() function', () => {
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

    describe('useStorage()', () => {
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

    it('should return useSelector() hook to consume Provider\'s context partially', () => {
        const value1 = 'value-1';
        const value2 = 'value-2';
        const { Provider, useSelector } = createStorage(identity);

        const Consumer = () => {
            const [ value ] = useSelector(
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

    describe('useSelector()', () => {
        it('should use equality function to check state changes when provided', () => {
            let value = 0;
            const reducer = () => {
                value += 1;

                return value;
            };
            const { Provider, useSelector } = createStorage(reducer);
            const Consumer = jest.fn(() => {
                const [ , dispatch ] = useSelector(
                    state => ({ state, value: 0 }),
                    (oldState, newState) => oldState.value === newState.value
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

    it('should return useActionCreators() hook bind action creators to dispatch', () => {
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

    describe('useActionCreators', () => {
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
    });
});
