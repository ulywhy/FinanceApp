import { BudgetTypes } from "./budgetTypes";


export class GUser{
    static current;
    
    _id;
    id;
    name;
    email;
    image;


    constructor(_id, id, name, email, image){
        this._id = _id
        this.id = id
        this.name = name
        this.email = email
        this.image = image
    }
  
}