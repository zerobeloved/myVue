import {mergeOptions} from "../util/options";

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this

    }
    vm._isVue = true
    vm.__v_skip = true
    // vm._scope = new EffectScope()//vue3新增的特性
    vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {}, vm
    )

    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')
}

export function resolveConstructorOptions(Ctor) {
    let options = Ctor.options
    if(Ctor.super) {
        const superOptions = resolveConstructorOptions(Ctor.super)
        const cachedSuperOptions = Ctor.superOptions
        if(superOptions !== cachedSuperOptions) {
            //这代表父Options变了，需要解析新options
            Ctor.superOptions = superOptions
            options = Ctor.options = mergeOptions((superOptions, Ctor.extendOptions))
            if(options.name) {
                options.components[options.name] = Ctor
            }
        }
    }
    return options
}
