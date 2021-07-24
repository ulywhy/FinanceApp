import { CallbackUtils } from "./callback-utils"

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
}
const baseUrl = 'https://finances-08bd.restdb.io/'
const guserUrl = baseUrl + 'rest/gusers'

export class GUsersCrud {

    static insertOne(guser){
        let body = new Array(guser)
        return fetch(guserUrl, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.getFirst)
        .catch(err => console.err(err))
    }

    static  getOneById(id){
        let queryObj = {
            id:  id
        }
        let query = '?q=' + JSON.stringify(queryObj)

        return fetch(guserUrl+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.log)
        .then(CallbackUtils.getFirst)
        .then(CallbackUtils.log)
        .catch(err => console.log(err))
    }
}
