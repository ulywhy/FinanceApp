import { MonthlyBudget } from "../model/monthly"
import { CallbackUtils } from "./callback-utils"

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
}
const baseUrl = 'https://finances-08bd.restdb.io/'
const monthlyUrl = baseUrl + 'rest/monthly'

export class MonthlyCrud {

    static async insertOne(month){
        console.log("saving monthly budget")
        let body = new Array(month)
        return await fetch(monthlyUrl, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(getJson)
        .then(CallbackUtils.log)
        .then(getFirst)
        .catch(err => console.err(err))
    }

    static async getOneById(id){
        let queryObj = {
            id:  id
        }
        let query = '?q=' + JSON.stringify(queryObj)

        let month = fetch(guserUrl+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(res => res.json())
        .then(getFirst)
        .catch(err => console.log(err))
        return month
    }

    static async getOneByDate(date){

        let queryObj = {
            date : {
                $date: DateTime.fromISO(date).set({day:1}).toISODate()
            }
        }

        let query = '?q=' + JSON.stringify(queryObj)
        
        console.log(query)
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(getJson)
        .then(listToMonths)
        .catch(err => console.log(err))
    }

    static getAllByPeriod(from, to){
        let queryObj = {
            "date" : {
                "$gte":{
                    "$date": from.set({day: 1}).toISODate()
                },
                "$lte":{
                    "$date": to.plus({month: 1}).set({day: 1}).toISODate()
                }
            }
        }
        let query = '?q=' + JSON.stringify(queryObj)
        
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(getJson)
        .then(log)
        .then(listToMonths)
        .then(log)
        .catch(err => console.log(err))
    }

    static getRecent(count){
        
        let query = '?max=' + count + '&sort=date'
        
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(getJson)
        .then(listToMonths)
        .then(log)
        .catch(err => console.log(err))
    }

}

function listToMonths(list){
    return list.map(l => MonthlyBudget.from(l))
}

function log(value){
    console.log(value)
    return value
}

function getFirst(list){
    return list.length > 0 ? list[0]: null
}

function getJson(res){
    return res.json()
}