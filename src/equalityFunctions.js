const strictEqual = (value1, value2) => value1 === value2;

const shallowEqual = (object1, object2) => Object.entries(object1)
    .every(
        ([ key, value ]) => value === object2[key]
    );

module.exports = {
    strictEqual,
    shallowEqual
};
