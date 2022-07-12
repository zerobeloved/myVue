import { pushTarget, popTarget } from '../observer/dep'
import {currentInstance} from "../../vue/src/v3/currentInstance";
export function initLifecycle(vm) {
    const options = vm.$options

    let parent = options.parent
    if(parent && !options.abstract) {
        while(parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }
    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm

    vm.$children = []
    vm.$refs = {}

    vm._provided = parent ? parent._provided : Object.create(null)
    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}

export function callHook(vm, hook, args) {
   const handlers = vm.$options[hook]
    if(handlers) {
        for(let i=0, j=handlers.length; i<j; i++) {
            try {
                handlers[i].call(vm)
            } catch (e) {
                handleError(e, vm, `${hook} hook`)
            }
        }
    }
}
