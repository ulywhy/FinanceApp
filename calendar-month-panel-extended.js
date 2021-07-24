/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {until} from 'lit/directives/until.js'; 
import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';

export class CalendarMonthPanelExtended extends LitElement {
  static get styles() {
    return css`
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
    return html`
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
