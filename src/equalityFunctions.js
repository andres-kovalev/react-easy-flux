const strictEqual = (value1, value2) => value1 === value2;

const shallowEqual = (object1, object2) => {
    if (object1 === object2) {
        return true;
    }

    if (!object1 || !object2) {
        return false;
    }

    const entries = Object.entries(object1);

    if (entries.length !== Object.entries(object2).length) {
        return false;
    }

    return entries.every(
        ([ key, value ]) => value === object2[key]
    );
};

module.exports = {
    strictEqual,
    shallowEqual
};
