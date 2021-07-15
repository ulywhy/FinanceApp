/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';
import { EditBudgetBoard } from './edit-budget-board.js';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class EditBudgetBoardController extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
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
    let success;
    if(this.budgetEntry.id !== 0){
      await Crud.updateBudgetEntry(this.budgetEntry) ? this.reset() : {};
    }else{
      await Crud.insertBudgetEntry(this.budgetEntry) ? this.reset() : {};
    }
  }

  reset(){
    this.budgetEntry = new BudgetEntry()
    this.getBudgetBoard().reset()
  }


  getBudgetBoard(){
    return this.shadowRoot.getElementById('edit-budget-board')
  }
  render() {
    return html`
      <edit-budget-board id="edit-budget-board"
        .amount=${this.budgetEntry.amount}
        .id=${this.budgetEntry.id}
        .date=${this.budgetEntry.date}
        .repeat=${this.budgetEntry.repeat}
        .type=${this.budgetEntry.type}
        @saveBudget=${this.save}></edit-budget-board>    
    `;
  }
}

window.customElements.define('edit-budget', EditBudgetBoardController);
