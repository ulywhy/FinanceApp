/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';

export class CalendarMonthPanel extends LitElement {
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
      budgets: Array,
      period: Object
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <table>
        <thead>
            <tr>
                <th>${this.period.start.monthLong}</th>
            </tr>
        </thead>
        <tbody>
          <tr>
          </tr>  
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

window.customElements.define('calendar-month-panel', CalendarMonthPanel);
