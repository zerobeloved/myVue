const _toString = Object.prototype.toString

export function isPlainObject(obj){
    return _toString.call(obj) === '[object Object]'
}


//把属性混合进目标对象中
export function extend(
    to,
    _from
){
    for (const key in _from) {
    to[key] = _from[key]
}
return to
}

export function isFunction(value) {
    return typeof value === 'function'
}
export const isArray = Array.isArray
