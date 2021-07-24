
export class MonthlyBudget{
    _id;
    userId;
    date;
    total;
    budgets;
    
    constructor(_id, userId, date = DateTime.now().toISODate(), total = 0, budgets = new Array()){
        this._id = _id
        this.userId = userId
        this.date = DateTime.fromISO(date).set({day: 1}).toISODate()
        this.total = total
        this.budgets = budgets
    }

    static from(obj){
        return new MonthlyBudget(obj._id, obj.userId, obj.date, obj.total, obj.budgets)
    }
  
    getDateTime(){
        return DateTime.fromISO(this.date)
    }
}