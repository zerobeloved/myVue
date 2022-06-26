export class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)//遍历一遍，把对象转成响应式
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for(let i=0; i<keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
}
//val参数代表对象的某个key的值
function defineReactive(obj,key,val) {
    //如果只有两个参数，val默认 == obj[key]
    if(arguments.length === 2) {
        val = obj[key]
    }
    if(typeof(val)  === 'object') {
        new Observer(val)
    }
    Object.defineProperty(obj, key, {
        enumerable: true,//表示是否可以通过delete删除并重新定义，改为访问器属性
        configurable: true,//表示是否可以通过for-in迭代
        get(){
            console.log(`${key}被读取了`)
            return val
        },
        set(newVal){
            if(val === newVal) return
            console.log(`${key}被修改了`)
            val = newVal
        }
    })
}
