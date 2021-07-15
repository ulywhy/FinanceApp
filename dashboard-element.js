/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Crud} from './services/crud.js';
import { BudgetEntry } from './model/budgetEntry.js';
import { BudgetTypes } from './model/budgetTypes.js';
import { PanelElement } from './panel-element.js';
import { EditBudgetBoardController } from './edit-budget-board-controller.js';
import { CalendarPanel } from './calendar-panel.js';

export class DashboardElement extends LitElement {
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
      budgets: {type: Array}
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
    let editBoard = this.shadowRoot.getElementById('edit-board')
    editBoard.budgetEntry = event.detail
  }
  
  render() {
    return html`
      <edit-budget id="edit-board"></edit-budget>
      <calendar-panel id="calendar-panel"></calendar-panel>
      <panel-element @updateBudget=${this.updateBudget}></panel-element>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define('dashboard-element', DashboardElement);
