/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {until} from 'lit/directives/until.js'; 
import {LitElement, html, css} from 'lit';
import {MonthlyCrud} from './services/monthly-crud.js';
import { CalendarMonthPanel } from './calendar-month-panel.js';
import { CalendarMonthPanelExtended } from './calendar-month-panel-extended.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';
import { MonthlyBudget } from './model/monthly.js';

export class CalendarPanel extends LitElement {
  static get styles() {
    return css`
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
    this.months = new Array()
    this.dateNow = DateTime.now().set({day: 1, hour:0, minute:0, second:0})
    this.dateBefore = this.dateNow.minus({months : 3})
    this.dateAfter = this.dateNow.plus({months : 4})
    this.period = Interval.fromDateTimes(this.dateBefore, this.dateAfter).splitBy({month: 1})
    this.currentPeriod = this.period.find(p => p.contains(this.dateNow))
    this.initMonths()
  }

  async initMonths(){
    this.months = await MonthlyCrud.getRecent(7)
    console.log(this.months)
    this.currentMonth = this.months.find(m => this.currentPeriod.contains(m.getDateTime()))
    console.log(this.currentPeriod.toISO())
    console.log(this.months.filter(m => this.currentPeriod.isAfter(m.getDateTime())))
  }

  reload(){
    this.initMonths()
  }

  render() {
    return html`
      <div class="flex flex-row flex-wrap space-between">
      
        ${this.months.filter(m => this.currentPeriod.isAfter(m.getDateTime()))
          .map(m => html `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}

        <calendar-month-panel-extended class="month main-month" .month=${this.currentMonth ? this.currentMonth : new MonthlyBudget()}></calendar-month-panel-extended>

        ${this.months.filter(m => this.currentPeriod.isBefore(m.getDateTime()))
          .map(m => html `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}
      </div>
    `;
  }

}

window.customElements.define('calendar-panel', CalendarPanel);
