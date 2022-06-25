let oil = {}
let val = 9
Object.defineProperty(oil,'price',{
    get(){
        console.log("告诉你今日油价")
        return val
    },
    set(newVal){
    console.log("油价更新了")
    val = newVal
    }
})
console.log(oil.price)
