/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class EditBudgetBoard extends LitElement {
  static get styles() {
    return css`
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
    this.requestUpdate()
  }
  /* Event Listener*/
  updateAmount(){
    let amount = parseFloat(this.getAmountElement().value)
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
    this.date = this.shadowRoot.getElementById('date').value
  }  

  /* Dispatch events */
  async save(event){
    console.log(this.date)
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
    return html`
    <h1>budget entry</h1>
    <div>
      <input id="amount" type="number" @change=${this.updateAmount}   value=${this.amount}>
    </div>
    <div>
      ${Object.entries(BudgetTypes.Repeat).map((entry) => html`         
        <label>
            <input type="radio" class="repeat" ?checked=${this.repeat === BudgetTypes.Repeat[entry[0]]} 
              @change=${this.updateRepeat} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      ${Object.entries(BudgetTypes.Type).map((entry) => html`         
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
