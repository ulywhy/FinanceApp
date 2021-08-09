
export class MonthlyBudget{
    _id;
    userId;
    date;
    total;
    budgets;
    
    constructor(_id, userId, date = DateTime.now().toISODate(), total = 0, budgets = new Array()){
        this._id = _id
        this.userId = userId
        this.date = DateTime.fromISO(date, { zone: 'utc'}).set({day: 1}).toISODate()
        this.total = total
        this.budgets = budgets
        console.log(this)
    }

    static from(obj){
        console.log(obj.date)
        console.log(DateTime.fromISO(obj.date))
        return new MonthlyBudget(obj._id, obj.userId, obj.date, obj.total, obj.budgets)
    }
  
    getDateTime(){
        return DateTime.fromISO(this.date, { zone: 'utc'})
    }
}