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
import { GUsersCrud } from './services/gusers-crud.js';
import { GUser } from './model/guser.js';

export class DashboardElement extends LitElement {
  static get styles() {
    return css`
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
      GUser.current = null
    }else{
      let result = await GUsersCrud.getOneById(user.getId())

      if(result != null){
        GUser.current = result
      }else{
        GUser.current = await GUsersCrud.insertOne(new GUser(null, user.getId(), user.getName(), user.getEmail(), user.getImageUrl()))
        console.log(GUser.current)
      }
    }
  }

  updateBudgetHandler(event){
    let editBoard = this.shadowRoot.getElementById('edit-board')
    editBoard.budgetEntry = event.detail
  }
  
  refresh(){
    let editBoard = this.shadowRoot.getElementById('calendar-panel')
    editBoard.reload()
  }

  render() {
    return html`
    <div ?hidden=${this.user === null}>
      <edit-budget id="edit-board" @budgetCreated=${this.refresh}></edit-budget>
      <calendar-panel id="calendar-panel"></calendar-panel>
      <!--panel-element @updateBudget=${this.updateBudgetHandler}></panel-element-->
    </div>
    `;
  }

}

window.customElements.define('dashboard-element', DashboardElement);
