export class Watcher {
    constructor(vm,expOrFn,cb) {
        this.vm = vm
        this.cb = cb
        this.getter = parsePath(expOrFn) //获取路径，在源码里单独放在工具类util里
        //Watcher被实例化的时候就调用get()
        this.value = this.get()
    }
    get() {
        //this是一个实例化后的watcher对象，这里先把this保存下来，换成Dep.target也可以
        window.target = this
        const vm = this.vm
        let value = this.getter.call(vm, vm)
        window.target = undefined
        return value
    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }

    parsePath (path) {
        const bailRE = /[^\w.$]/
        if (bailRE.test(path)) {
            return
        }
        const segments = path.split('.')
        return function (obj) {
            for (let i = 0; i < segments.length; i++) {
                if (!obj) return
                obj = obj[segments[i]]
            }
            return obj
        }
    }
}
