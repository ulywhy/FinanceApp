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

  createRenderRoot() { return this;}

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
    this.date = document.getElementById('date').value
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
    return document.getElementById("amount")
  }
  getTypeElement(){
    return this.getRadioCheckedElement('type')
  }
  getRepeatElement(){
    return this.getRadioCheckedElement('repeat')
  }

  getRadioElements(className){
    return Array.from(document.querySelectorAll('.'+className)) 
  }
  getRadioCheckedElement(name){
      return document.querySelector('.'+name+':checked')  
  }

  render() {
    return html`
    <div class="section">
    <div>
      <input id="amount" class="input" type="number" @change=${this.updateAmount}   value=${this.amount}>
    </div>
    <div>
      ${Object.entries(BudgetTypes.Repeat).map((entry) => html`         
        <label>
            <input type="radio" class="radio repeat" ?checked=${this.repeat === BudgetTypes.Repeat[entry[0]]} 
              @change=${this.updateRepeat} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      ${Object.entries(BudgetTypes.Type).map((entry) => html`         
        <label>
            <input type="radio" class="radio type" ?checked=${this.type === BudgetTypes.Type[entry[0]]}
              @change=${this.updateType} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      <input type="date" id="date" class="input" @change=${this.updateDate} .value=${this.date}>
     </div>
    <div>
      <button class="button" @click=${this.save} ?enabled=${this.enabled}>${this.id ? 'update' : 'save'}</button>
      <button class="button" @click=${this.reset} ?hidden=${this.id == undefined}>clear</button>
    </div>
  </div>
    `;
  }

}

window.customElements.define('edit-budget-board', EditBudgetBoard);
