import { CallbackUtils } from "./callback-utils";
import { BudgetEntry } from "../model/budgetEntry";
import { GUsersCrud } from "./gusers-crud";
import { GUser } from "../model/guser";
import { MonthlyCrud } from "./monthly-crud";
import { MonthlyBudget } from "../model/monthly";

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
}

export class Crud {

    static async insertBudgetEntry(entry){
        delete entry._id
        
        
        entry.userId = GUser.current._id
        let body = new Array(entry)
        
        return fetch('https://finances-08bd.restdb.io/rest/budget', {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.getFirst)
        .then(CallbackUtils.log)
        .catch(CallbackUtils.log)
    }

    static insertChildBudgetEntry(entry){
        return fetch('https://finances-08bd.restdb.io/rest/budget', {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(entry)
        })
        .then(res => res.json())
        .catch(err => console.err(err))
    }
    static updateBudgetEntry(entry){

        return fetch('https://finances-08bd.restdb.io/rest/budget/'+ entry._id, {
            mode: 'cors',
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(entry)
        })
        .then(res => res.json())
        .catch(err => console.err(err))
    }


    static async deleteBudgetEntry(id){

        return fetch('https://finances-08bd.restdb.io/rest/budget/'+id, {
            mode: 'cors',
            method: 'DELETE',
            headers: headers,
        })
        .then(res => res.json())
        .then(deletes => deletes.result.includes(id))
        .catch(err => console.log(err))
    }
    static  getBudgets(queryParams={}){
        let query = '?' + JSON.stringify(queryParams)
        return fetch('https://finances-08bd.restdb.io/rest/budget'+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(res => res.json())
        .then(list => list.map(b => BudgetEntry.from(b)))
        .catch(err => console.log(err))
    }

    static  getBudgetsByDatePeriod(from, to){
        let queryObj = {
            "date" : {
                "$gte":{
                    "$date": from.set({day: 1, hour: 0, minute: 0, second: 0}).toISO()
                },
                "$lte":{
                    "$date": to.plus({month: 1}).set({day: 1, hour: 0, minute: 0, second: 0}).toISO()
                }
            }
        }
        return Crud.getBudgets(queryObj)
    }


 }

