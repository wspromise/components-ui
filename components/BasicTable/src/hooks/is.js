const toString = Object.prototype.toString;

export function is (val, type) {
    return toString.call(val) === `[object ${type}]`;
}

export function isDef (val) {
    return typeof val !== 'undefined';
}

export function isUnDef (val) {
    return !isDef(val);
}

export function isNumber (val) {
    return is(val, 'Number');
}

export function isString (val) {
    return is(val, 'String');
}

export function isFunction (val) {
    return typeof val === 'function';
}

export function isBoolean (val) {
    return is(val, 'Boolean');
}

export function isArray (val) {
    return val && Array.isArray(val);
}

export function isObject (val) {
    return val !== null && is(val, 'Object');
}

export function isNull (val) {
    return val === null;
}

export function isNullOrUnDef (val) {
    return isUnDef(val) || isNull(val);
}