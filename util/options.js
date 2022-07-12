import {extend, isArray, isPlainObject, isFunction} from "../shared/util";

const starts = config.optionMergeStrategies

const defaultStart = function (parentVal, childVal) {//初始化一个开始策略，有child找child
    return childVal === undefined? parentVal : childVal
}

//创建一个函数的纯净缓存版本
export function cached (fn){
    const cache = Object.create(null)
    return function cachedFn(str) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

const camelizeRE = /-(\w)/g //匹配横线
export const camelize = cached(str =>{
    return str.replace(camelizeRE,(_, c) => (c ? c.toUpperCase(): ''))
})

function normalizeProps(options, vm) {//格式化Props
    const props = options.props
    if(!props) return
    const res = {}
    let i, val, name
    if(Array.isArray(props)) {
        i = props.length
        while(i--) {
            val = props[i]
            if(typeof(val) === 'string') {
                name = camelize(val)
                res[name] = {}
            }
        }
    } else if(Object.prototype.toString.call(props) === 'object Object') {
        for(const key in props) {
            val = props[key]
            name = camelize(key)
            res[name] = Object.prototype.toString.call(props) === 'object Object'? val : {}
        }
    }
}
function normalizeInject(options, vm) {
    const inject = options.inject
    if (!inject) return
    const normalized= (options.inject = {})
    if (isArray(inject)) {
        for (let i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] }
        }
    } else if (isPlainObject(inject)) {
        for (const key in inject) {
            const val = inject[key]
            normalized[key] = isPlainObject(val)
                ? extend({ from: key }, val)
                : { from: val }
        }
    }
}

function normalizeDirectives(options) {
    const dirs = options.directives
    if (dirs) {
        for (const key in dirs) {
            const def = dirs[key]
            if (isFunction(def)) {
                dirs[key] = { bind: def, update: def }
            }
        }
    }
}

export function mergeOptions(parent, child, vm) {
    if(typeof(child) === 'function') {
        child = child.options
    }

    normalizeProps(child, vm)
    normalizeInject(child, vm)
    normalizeDirectives(vm)

    if(!child._base) {//用来判断是否是扁平化结构
        if(child.extends) {
            parent = mergeOptions(parent, child.extends, vm)
        }
        if(child.mixins) {
            for(let i=0, l=child.mixin.length; i<l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
    }
    const options = {}
    let key
    for(key in parent) {
        mergeField(key)
    }
    for(key in child) {
        if(!Object.prototype.hasOwnProperty.call(parent, key)) {}
        mergeField(key)
    }

    function mergeField(key) {
        const start = starts[key] || defaultStart
        options[key] = start(parent[key], child[key], vm, key)
    }
    return options
}
