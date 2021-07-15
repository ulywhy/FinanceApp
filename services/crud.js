import { BudgetEntry } from "../model/budgetEntry";

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
}

export class Crud {

    static insertBudgetEntry(entry){
        let body = new Array(entry)
        return fetch('https://finances-08bd.restdb.io/rest/budget', {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        })
        .catch(err => console.err(err))
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
        let id = entry.id
        delete entry.id;

        return fetch('https://finances-08bd.restdb.io/rest/budget/'+ id, {
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
    static  getBudgets(){

        return fetch('https://finances-08bd.restdb.io/rest/budget', {
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
        let query = 'q=' + JSON.stringify(queryObj)
        
        return fetch('https://finances-08bd.restdb.io/rest/budget?'+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(res => res.json())
        .then(list => list.map(b => BudgetEntry.from(b)))
        .catch(err => console.log(err))
    }


 }

