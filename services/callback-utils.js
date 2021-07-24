
export class CallbackUtils{
    static log(value){
        console.log(value)
        return value
    }

    static getFirst(list){
        return list.length > 0 ? list[0]: null
    }

    static getJson(res){
        return res.json()
    }
}