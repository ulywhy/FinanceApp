import { BudgetTypes } from "./budgetTypes";

export class BudgetEntry extends BudgetEntry{
    parentId;
    
    constructor(parent, id=0, amount=0, 
        repeat=BudgetTypes.Repeat.ONCE, 
        type=BudgetTypes.Type.OUTCOME,
        date=new Date()){
        this.parentId = parent instanceof BudgetEntry ? parent.id : parent;
        this.id = id;
        this.setAmount(amount);
        this.setRepeat(repeat);
        this.setType(type);
        this.setDate(date);
    }

    static from(obj){
        return new BudgetEntry(obj._id,
            obj.amount, 
            BudgetTypes.Repeat[obj.repeat],
            BudgetTypes.Type[obj.type],
            obj.date);
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
        return this.date;
    }

    setDate(date){
        this.date = date
    }
}