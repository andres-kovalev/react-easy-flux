const React = require('react');
const { mount } = require('enzyme');

const createStorage = require('../src/createStorage');

const identity = value => value;

describe('createStorage', () => {
    it.each([ 'Provider', 'useStorage', 'useActionCreators' ])('should return %s', (field) => {
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
