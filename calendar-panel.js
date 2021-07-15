/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { CalendarMonthPanel } from './calendar-month-panel.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';

export class CalendarPanel extends LitElement {
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
      dateNow: Object,
      dateBefore: Object,
      dateAfter: Object,
      period: Object
    };
  }

  constructor() {
    super();
    this.budgets = []
    this.dateNow = DateTime.now().set({day: 1, hour:0, minute:0, second:0})
    this.dateBefore = this.dateNow.minus({months : 3})
    this.dateAfter = this.dateNow.plus({months : 4})
    this.period = Interval.fromDateTimes(this.dateBefore, this.dateAfter).splitBy({month: 1})
    this.initMonths()
  }

  async initMonths(){
    this.budgets = await Crud.getBudgetsByDatePeriod(this.dateBefore, this.dateAfter)
  }
  
  render() {
    return html`
      <h3>Calendar</h3>
      <table>
        <tbody>
            ${this.period.map((p, idx) => html `
               ${idx % 3 == 0 ? html `</tr><tr>`: ''}
              <td>
                <calendar-month-panel .period=${p} .budgets=${this.budgets.filter(b => p.contains(b.getDate()))}></calendar-month-panel>
              </td>
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

window.customElements.define('calendar-panel', CalendarPanel);
