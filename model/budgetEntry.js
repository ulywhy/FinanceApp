import { BudgetTypes } from "./budgetTypes";


export class BudgetEntry {
    _id;
    amount;
    repeat;
    type;
    date;
    monthId;

    constructor(_id='', amount=0, 
        repeat=BudgetTypes.Repeat.ONCE, 
        type=BudgetTypes.Type.OUTCOME,
        date=DateTime.now().toISODate(), monthId = undefined){
        this._id = _id;
        this.setAmount(amount);
        this.setRepeat(repeat);
        this.setType(type);
        this.setDate(date);
        this.monthId = monthId;
    }

    static from(obj){
        return new BudgetEntry(obj._id,
            obj.amount, 
            BudgetTypes.Repeat[obj.repeat],
            BudgetTypes.Type[obj.type],
            obj.date, obj.monthId);
    }

    getAmount(){
        return this.amount.toString();
    }

    setAmount(amount){
        if(amount < 0) return false;
        this.amount = amount;
        return true;
    }

    getReat(){
        return this.repeat;
    }

    setRepeat(repeat){
        this.repeat = repeat;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
    }

    getDate(){
        return DateTime.fromISO(this.date);
    }

    setDate(date){
        if(typeof date === 'DateTime'){
            this.date = date.toISODate(date)
        }else{
            this.date= date;
        }
    }
}