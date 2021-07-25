/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';

export class PanelElement extends LitElement {
  static get styles() {
    return css`
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
    let id = event.target.getAttribute('data-budget-id')
    let budget = this.budgets.find(b => b.id === id)
    this.dispatchEvent(
      new CustomEvent('updateBudget', { 
        detail: budget,
        bubbles: true, 
        composed: true })
    );
  }

  async deleteBudget(event){
    let id = event.target.getAttribute('data-budget-id')
    if(await Crud.deleteBudgetEntry(id)){
      this.budgets.splice(this.budgets.findIndex(b => b.id === id), 1)
      this.requestUpdate()
    }
  }
  
  render() {
    return html`
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
          ${this.budgets.map(budget => html`
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
}

window.customElements.define('panel-element', PanelElement);
