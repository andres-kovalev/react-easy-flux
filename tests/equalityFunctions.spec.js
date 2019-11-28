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
    it('should return true for equal objects', () => {
        const value = {};

        expect(shallowEqual(value, value)).toBe(true);
    });

    it('should return false when one of values is falsy', () => {
        expect(shallowEqual({})).toBe(false);
    });

    describe('for objects', () => {
        it('should return true when both arguments have equal fields', () => {
            const field1 = {};
            const field2 = {};

            expect(shallowEqual({ field1, field2 }, { field1, field2 })).toBe(true);
        });

        it('should return false when arguments have not equal fields', () => {
            expect(shallowEqual({ field1: {} }, { field1: {} })).toBe(false);
        });

        it('should return false when arguments have different amount of items', () => {
            expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
        });
    });

    describe('for arrays', () => {
        it('should return true when both arguments have equal fields', () => {
            const item1 = {};
            const item2 = {};

            expect(shallowEqual([ item1, item2 ], [ item1, item2 ])).toBe(true);
        });

        it('should return false when arguments have not equal fields', () => {
            expect(shallowEqual([ {} ], [ {} ])).toBe(false);
        });

        it('should return false when arguments have different amount of items', () => {
            expect(shallowEqual([ 1 ], [ 1, 2 ])).toBe(false);
        });
    });
});
