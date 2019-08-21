const combineReducers = require('../src/combineReducers');

describe('combineReducers', () => {
    it('should create new reducer from provided map', () => {
        const add = value => value + 1;
        const subtract = value => value - 1;

        const reducer = combineReducers({
            add, complex: { add, subtract }
        });

        expect(reducer({
            add: 0,
            complex: {
                add: 0,
                subtract: 0
            }
        })).toEqual({
            add: 1,
            complex: {
                add: 1,
                subtract: -1
            }
        });
    });
});
