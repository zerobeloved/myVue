export function initMxin(Vue) {
    Vue.prototype._init = function(optins) {
        const vm = this
        
    }
    vm._isVue = true
    vm.__v_skip = true
    // vm._scope = new EffectScope()//vue3新增的特性
    vm.$options = mergeOptions(
        resolveConstructirOptions(vm.constructor),
        optins || {},
        vm
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