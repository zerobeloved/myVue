import type {Component} from "../types/component";
import {updateComponentListeners} from "../../vue/src/core/instance/events";

export function initEvent(vm: Component) {
    vm._events = Object.create(null)
    vm._hasHookEvent = false
    const listeners = vm.$options._parentListeners
    if(listeners) {
        updateComponentListeners(vm,listeners)
    }
}

let target: any
function add(event, fn) {
    target.$on(event, fn)
}
function remove(event, fn) {
    target.$off(event, fn)
}
function createOnceHandler(event, fn) {
    const _target = target
    return function onceHandler() {
        const res = fn.apply(null, arguments)
        if(res !== null) {
            _target.$off(event, onceHandler)
        }
    }
}

export function updateComponetListeners(
    vm: Component,
    listeners: Object,
    oldListeners?: Object | null
) {
    target = vm
    updateListeners(
        listeners,
        oldListeners || {},
        add,
        remove,
        createOnceHandler,
        vm
    )
    target = undefined
}
