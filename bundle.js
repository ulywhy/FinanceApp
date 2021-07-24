(function (exports, lit) {
    'use strict';

    class CallbackUtils{
        static log(value){
            console.log(value);
            return value
        }

        static getFirst(list){
            return list.length > 0 ? list[0]: null
        }

        static getJson(res){
            return res.json()
        }
    }

    const BudgetTypes = {
        Repeat: {
            DAILY:"daily",
            WEEKLY: "weekly",
            MONTHLY: "monthly",
            ONCE:  "once",
            //CUSTOM: "custom"
        },
        Type: {
            INCOME: "income",
            OUTCOME: "outcome"
        }
    };

    class BudgetEntry {
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
                this.date = date.toISODate(date);
            }else {
                this.date= date;
            }
        }
    }

    const headers$2 = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-apikey': '60eb08ef6661365596af552e'
    };
    const baseUrl$1 = 'https://finances-08bd.restdb.io/';
    const guserUrl$1 = baseUrl$1 + 'rest/gusers';

    class GUsersCrud {

        static insertOne(guser){
            let body = new Array(guser);
            return fetch(guserUrl$1, {
                mode: 'cors',
                method: 'POST',
                headers: headers$2,
                body: JSON.stringify(body)
            })
            .then(CallbackUtils.getJson)
            .then(CallbackUtils.getFirst)
            .catch(err => console.err(err))
        }

        static  getOneById(id){
            let queryObj = {
                id:  id
            };
            let query = '?q=' + JSON.stringify(queryObj);

            return fetch(guserUrl$1+query, {
                mode: 'cors',
                method: 'GET',
                headers: headers$2,
            })
            .then(CallbackUtils.getJson)
            .then(CallbackUtils.log)
            .then(CallbackUtils.getFirst)
            .then(CallbackUtils.log)
            .catch(err => console.log(err))
        }
    }

    class GUser{
        static current;
        
        _id;
        id;
        name;
        email;
        image;


        constructor(_id, id, name, email, image){
            this._id = _id;
            this.id = id;
            this.name = name;
            this.email = email;
            this.image = image;
        }
      
    }

    class MonthlyBudget{
        _id;
        userId;
        date;
        total;
        budgets;
        
        constructor(_id, userId, date = DateTime.now().toISODate(), total = 0, budgets = new Array()){
            this._id = _id;
            this.userId = userId;
            this.date = DateTime.fromISO(date).set({day: 1}).toISODate();
            this.total = total;
            this.budgets = budgets;
        }

        static from(obj){
            return new MonthlyBudget(obj._id, obj.userId, obj.date, obj.total, obj.budgets)
        }
      
        getDateTime(){
            return DateTime.fromISO(this.date)
        }
    }

    const headers$1 = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-apikey': '60eb08ef6661365596af552e'
    };
    const baseUrl = 'https://finances-08bd.restdb.io/';
    const monthlyUrl = baseUrl + 'rest/monthly';

    class MonthlyCrud {

        static async insertOne(month){
            console.log("saving monthly budget");
            let body = new Array(month);
            return await fetch(monthlyUrl, {
                mode: 'cors',
                method: 'POST',
                headers: headers$1,
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
            };
            let query = '?q=' + JSON.stringify(queryObj);

            let month = fetch(guserUrl+query, {
                mode: 'cors',
                method: 'GET',
                headers: headers$1,
            })
            .then(res => res.json())
            .then(getFirst)
            .catch(err => console.log(err));
            return month
        }

        static async getOneByDate(date){

            let queryObj = {
                date : {
                    $date: DateTime.fromISO(date).set({day:1}).toISODate()
                }
            };

            let query = '?q=' + JSON.stringify(queryObj);
            
            console.log(query);
            return fetch(monthlyUrl + query, {
                mode: 'cors',
                method: 'GET',
                headers: headers$1,
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
            };
            let query = '?q=' + JSON.stringify(queryObj);
            
            return fetch(monthlyUrl + query, {
                mode: 'cors',
                method: 'GET',
                headers: headers$1,
            })
            .then(getJson)
            .then(log)
            .then(listToMonths)
            .then(log)
            .catch(err => console.log(err))
        }

        static getRecent(count){
            
            let query = '?max=' + count + '&sort=date';
            
            return fetch(monthlyUrl + query, {
                mode: 'cors',
                method: 'GET',
                headers: headers$1,
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
        console.log(value);
        return value
    }

    function getFirst(list){
        return list.length > 0 ? list[0]: null
    }

    function getJson(res){
        return res.json()
    }

    const headers = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-apikey': '60eb08ef6661365596af552e'
    };

    class Crud {

        static async insertBudgetEntry(entry){
            delete entry._id;
            
            
            entry.userId = GUser.current._id;
            let body = new Array(entry);
            
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
            let query = '?' + JSON.stringify(queryParams);
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
            };
            return Crud.getBudgets(queryObj)
        }


     }

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */

    class PanelElement extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
      }

      static get properties() {
        return {
          budgets: {type: Array},
        };
      }

      constructor() {
        super();
        this.budgets = new Array();
      }

      async firstUpdated() {
        super.firstUpdated();
        this.budgets = await Crud.getBudgets();
      }

      updateBudget(event){
        let id = event.target.getAttribute('data-budget-id');
        let budget = this.budgets.find(b => b.id === id);
        this.dispatchEvent(
          new CustomEvent('updateBudget', { 
            detail: budget,
            bubbles: true, 
            composed: true })
        );
      }

      async deleteBudget(event){
        let id = event.target.getAttribute('data-budget-id');
        if(await Crud.deleteBudgetEntry(id)){
          this.budgets.splice(this.budgets.findIndex(b => b.id === id), 1);
          this.requestUpdate();
        }
      }
      
      render() {
        return lit.html`
      <h1>History</h1>
      <table>
        <thead>
            <tr>
              <th>amount</th>
              <th>type</th>
              <th>repeat</th>
              <th>date</th>
          </tr>
        </thead>
        <tbody>
          ${this.budgets.map(budget => lit.html`
            <tr>         
              <td>${budget.amount}</td>
              <td>${budget.type}</td>
              <td>${budget.repeat}</td>
              <td>${budget.date}</td>
              <td>
                <button data-budget-id=${budget.id} @click=${this.updateBudget}>edit</button>
              </td>
              <td>
                <button data-budget-id=${budget.id} @click=${this.deleteBudget}>delete</button>
              </td>
            </tr>  
          `)}
        </tbody>
        <tfoot>
          <tr>
            <td>income:</td>
            <td>
              ${this.budgets.filter(b => b.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td>outcome:</td>
            <td>
              ${this.budgets.filter(b => b.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td>balance</td>
            <td>
              ${this.budgets.map(b => b.type === BudgetTypes.Type.OUTCOME ? -b.amount : b.amount).reduce((t, a)=> a + t, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
      }

      _onClick() {
        this.count++;
      }
    }

    window.customElements.define('panel-element', PanelElement);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    /**
     * An example element.
     *
     * @slot - This element has a slot
     * @csspart button - The button
     */
    class EditBudgetBoard extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
      table{
        overflow-y: auto;
      }
    `;
      }

      static get properties() {
        return {
          amount:Number,
          type:Object,
          repeat:Object,
          date:String,
          id:String
        };
      }

      constructor() {
        super();
      }

      reset(){
        this.requestUpdate();
      }
      /* Event Listener*/
      updateAmount(){
        let amount = parseFloat(this.getAmountElement().value);
        this.amount = amount;
      }
      updateRepeat(event){
        this.getRadioElements('repeat')
          .filter(e => e != event.target)
          .forEach(e => e.checked = false);

        this.repeat = event.target.value;
      }
      updateType(event){
        this.getRadioElements('type')
          .filter(e => e != event.target)
          .forEach(e => e.checked = false);

        this.type = event.target.value;
      }
      updateDate(){
        this.date = this.shadowRoot.getElementById('date').value;
      }  

      /* Dispatch events */
      async save(event){
        console.log(this.date);
        this.dispatchEvent(new CustomEvent('saveBudget', {
          detail: new BudgetEntry(0, this.amount, this.repeat, this.type, this.date),
          bubbles: true, 
          composed: true })
        );
      }

      /* view Queries */
      getAmountElement(){
        return this.getElementById("amount")
      }
      getTypeElement(){
        return this.getRadioCheckedElement('type')
      }
      getRepeatElement(){
        return this.getRadioCheckedElement('repeat')
      }

      getElementById(id){
        return this.shadowRoot.getElementById(id)
      }
      getRadioElements(className){
        return Array.from(this.shadowRoot.querySelectorAll('.'+className)) 
      }
      getRadioCheckedElement(name){
          return this.shadowRoot.querySelector('.'+name+':checked')  
      }

      render() {
        return lit.html`
    <h1>budget entry</h1>
    <div>
      <input id="amount" type="number" @change=${this.updateAmount}   value=${this.amount}>
    </div>
    <div>
      ${Object.entries(BudgetTypes.Repeat).map((entry) => lit.html`         
        <label>
            <input type="radio" class="repeat" ?checked=${this.repeat === BudgetTypes.Repeat[entry[0]]} 
              @change=${this.updateRepeat} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      ${Object.entries(BudgetTypes.Type).map((entry) => lit.html`         
        <label>
            <input type="radio" class="type" ?checked=${this.type === BudgetTypes.Type[entry[0]]}
              @change=${this.updateType} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      <input type="date" id="date" @change=${this.updateDate} .value=${this.date}>
     </div>
    <div>
      <button @click=${this.save} ?enabled=${this.enabled}>${this.id ? 'update' : 'save'}</button>
      <button @click=${this.reset} ?hidden=${this.id == undefined}>clear</button>
    </div>
    `;
      }

    }

    window.customElements.define('edit-budget-board', EditBudgetBoard);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    /**
     * An example element.
     *
     * @slot - This element has a slot
     * @csspart button - The button
     */
    class EditBudgetBoardController extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        padding: 0px;
        max-width: 800px;
      }
    `;
      }

      static get properties() {
        return {
          guser:Object,
          budgetEntry: {type: Object}
        };
      }

      constructor() {
        super();
        this.budgetEntry = new BudgetEntry();
      }  

      /* CRUD ACTIONS */
      async save(event){
        this.budgetEntry = event.detail;
        let success = false;
        if(this.budgetEntry._id.lenght > 0){
          success = await Crud.updateBudgetEntry(this.budgetEntry);
        }else {
          success = await Crud.insertBudgetEntry(this.budgetEntry, GUser.current._id);
        }

        if(success){
          this.reset();
          this.dispatchEvent(new CustomEvent('budgetCreated', {
            detail: success,
            bubbles: true, 
            composed: true })
          );
          }
      }

      
      reset(){
        this.budgetEntry = new BudgetEntry();
        this.getBudgetBoard().reset();
      }


      getBudgetBoard(){
        return this.shadowRoot.getElementById('edit-budget-board')
      }
      render() {
        return lit.html`
      <edit-budget-board id="edit-budget-board"
        .amount=${this.budgetEntry.amount}
        .id=${this.budgetEntry._id}
        .date=${this.budgetEntry.date}
        .repeat=${this.budgetEntry.repeat}
        .type=${this.budgetEntry.type}
        @saveBudget=${this.save}></edit-budget-board>    
    `;
      }
    }

    window.customElements.define('edit-budget', EditBudgetBoardController);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */

    class CalendarMonthPanel extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        border-radius: 5px;
        padding: 0px;
      }
      .income,
      .outcome,
      .balance{
        border:solid 1px;
        border-radius: 5px;
      }
      .income{
        border-color: green;
      }
      .outcome{
        border-color: red;
      }
      .balance{
        border-color: blue;
      }
    `;
      }

      static get properties() {
        return {
          month: Object,
          incomes: Array,
          outcomes: Array,
          total: Number
        };
      }

      constructor() {
        super();
        this.total = 0;
      }

      getIncomeBudgets(){
        console.log(this.month);
        return Crud.getBudgets({})
      }

      getOutcomeBudgets(){

      }

      render() {
        return lit.html`
      <table>
        <thead>
            <tr>
                <th>${this.month.getDateTime().monthLong}</th>
            </tr>
        </thead>
        <tbody>
          <tr>
          </tr>  
        </tbody>
        <tfoot>
          <tr>
            <td class="income">
              ${this.month.budgets.filter(m => m.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td class="outcome">
            ${this.month.budgets.filter(m => m.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td class="balance">
              ${this.month.total}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
      }

    }

    window.customElements.define('calendar-month-panel', CalendarMonthPanel);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */

    class CalendarMonthPanelExtended extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        border-radius: 5px;
        padding: 1vw;
        width: 30vw;
      }
      .income,
      .outcome,
      .balance{
        border:solid 1px;
        border-radius: 5px;
      }
      .income{
        border-color: green;
      }
      .outcome{
        border-color: red;
      }
      .balance{
        border-color: blue;
      }
    `;
      }

      static get properties() {
        return {
          month: Object,
          period: Object
        };
      }

      constructor() {
        super();
      }

      render() {
        return lit.html`
      <table>
        <thead>
            <tr>
                <th>${this.month.getDateTime().monthLong}</th>
            </tr>
        </thead>
        <tbody>
          <tr>
          </tr>  
        </tbody>
        <tfoot>
          <tr>
            <td class="income">
              ${this.month.budgets.filter(b => b.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td class="outcome">
              ${this.month.budgets.filter(b => b.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td class="balance">
              ${this.month.total}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
      }

    }

    window.customElements.define('calendar-month-panel-extended', CalendarMonthPanelExtended);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */

    class CalendarPanel extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 0px;
      }
      .flex{
        display: flex;
      }
      .flex-row{
        flex-direction: row;
      }
      .flex-wrap{
        flex-wrap: wrap;
      }
      .space-between{
        justify-content: space-between;
      }
      .month{
        flex-grow: 1;
        margin: .2em;
      }
      .main-month{
        width: 100%;
      }
    `;
      }

      static get properties() {
        return {
          months: {type: Array},
          dateNow: Object,
          dateBefore: Object,
          dateAfter: Object,
          period: Object,
          currentPeriod: Object
        };
      }

      constructor() {
        super();
        this.months = new Array();
        this.dateNow = DateTime.now().set({day: 1, hour:0, minute:0, second:0});
        this.dateBefore = this.dateNow.minus({months : 3});
        this.dateAfter = this.dateNow.plus({months : 4});
        this.period = Interval.fromDateTimes(this.dateBefore, this.dateAfter).splitBy({month: 1});
        this.currentPeriod = this.period.find(p => p.contains(this.dateNow));
        this.initMonths();
      }

      async initMonths(){
        this.months = await MonthlyCrud.getRecent(7);
        this.currentMonth = this.months.find(m => this.currentPeriod.contains(m.getDateTime()));
      }

      reload(){
        this.initMonths();
      }

      render() {
        return lit.html`
      <div class="flex flex-row flex-wrap space-between">
      
        ${this.months.filter(m => this.currentPeriod.isAfter(m.getDateTime()))
          .map(m => lit.html `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}

        <calendar-month-panel-extended class="month main-month" .month=${this.currentMonth ? this.currentMonth : new MonthlyBudget()}></calendar-month-panel-extended>

        ${this.months.filter(m => this.currentPeriod.isBefore(m.getDateTime()))
          .map(m => lit.html `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}
      </div>
    `;
      }

    }

    window.customElements.define('calendar-panel', CalendarPanel);

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */

    class DashboardElement extends lit.LitElement {
      static get styles() {
        return lit.css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 0px;
      }
    `;
      }

      static get properties() {
        return {
          user: Object
        };
      }

      constructor() {
        super();
      }

      async firstUpdated() {
        super.firstUpdated();
        this.budgets = await Crud.getBudgets();
      }

      async setUser(user){
        if(user == null){
          GUser.current = null;
        }else {
          let result = await GUsersCrud.getOneById(user.getId());

          if(result != null){
            GUser.current = result;
          }else {
            GUser.current = await GUsersCrud.insertOne(new GUser(null, user.getId(), user.getName(), user.getEmail(), user.getImageUrl()));
            console.log(GUser.current);
          }
        }
      }

      updateBudgetHandler(event){
        let editBoard = this.shadowRoot.getElementById('edit-board');
        editBoard.budgetEntry = event.detail;
      }
      
      refresh(){
        let editBoard = this.shadowRoot.getElementById('calendar-panel');
        editBoard.reload();
      }

      render() {
        return lit.html`
    <div ?hidden=${this.user === null}>
      <edit-budget id="edit-board" @budgetCreated=${this.refresh}></edit-budget>
      <calendar-panel id="calendar-panel"></calendar-panel>
      <!--panel-element @updateBudget=${this.updateBudgetHandler}></panel-element-->
    </div>
    `;
      }

    }

    window.customElements.define('dashboard-element', DashboardElement);

    exports.DashboardElement = DashboardElement;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, lit));
