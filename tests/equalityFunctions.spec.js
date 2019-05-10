const { strictEqual, shallowEqual } = require('../src/equalityFunctions');

describe('strictEqual', () => {
    it('should return true when both arguments are strictly equal', () => {
        const value = {};

        expect(strictEqual(value, value)).toBe(true);
    });

    it('should return false when arguments are not strictly equal', () => {
        expect(strictEqual({}, {})).toBe(false);
    });
});

describe('shallowEqual', () => {
    it('should return true when both arguments have equal fields', () => {
        const field1 = {};
        const field2 = {};

        expect(shallowEqual({ field1, field2 }, { field1, field2 })).toBe(true);
    });

    it('should return false when arguments have not equal fields', () => {
        expect(shallowEqual({ field1: {} }, { field1: {} })).toBe(false);
    });
});
