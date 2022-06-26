export default class Dep {
    constructor() {
        this.subs = []
    }
    depend() {
        if(window.target) {
            this.addSub(window.target)
        }
    }
    //添加依赖的方法
    addSub(sub) {
        this.subs.push(sub)
        console.log("添加了依赖，现在的依赖有：",this.subs)
    }
    //移除依赖
    removeSub(sub) {
        remove(this.subs, sub)
    }
    //在源码中remove函数被单独放在了一个util文件夹内，但这里我们先不考虑
    remove(arr,item) {
        if(arr.length) {
            const index = arr.indexOf(item)
            if(index > -1) {
                return arr.splice(index, 1)
            }
        }
    }
    notify() {
        const subs = this.subs.slice()
        for(let i=0; i<subs.length; i++) {
            subs[i].update()
        }
    }

}
