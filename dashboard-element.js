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
import { LoginElement } from './login-element.js'
import { EditBudgetBoardController } from './edit-budget-board-controller.js';
import { CalendarPanel } from './calendar-panel.js';
import { GUsersCrud } from './services/gusers-crud.js';
import { GUser } from './model/guser.js';

export class DashboardElement extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      anonymus: Boolean
    };
  }

  constructor() {
    super();
    this.anonymus = true
  }

  createRenderRoot() { return this;}

  async firstUpdated() {
    super.firstUpdated();
    this.budgets = await Crud.getBudgets();
  }

  setUser(event){
    console.log(event)
    let user = event.detail
    this.anonymus = (user === null || user === undefined)
    console.log(user)
    console.log(this.anonymus)
    this.requestUpdate()
  }

  updateBudgetHandler(event){
    let editBoard = document.getElementById('edit-board')
    editBoard.budgetEntry = event.detail
  }
  
  refresh(){
    let editBoard = document.getElementById('calendar-panel')
    editBoard.reload()
  }

  tooglePanel(event){
    this.toogleTabs(event.target)
    this.hideActivePanel()
    this.showTargetPanel(event.target)
    
  }

  toogleTabs(target){
    let activeTab = document.querySelector('.panel-tabs > a.is-active')
    activeTab.classList.remove('is-active')
    target.classList.add('is-active')
  }

  hideActivePanel(){
    let activePanel = document.querySelector('.panel-block.is-active')
    activePanel.classList.remove('is-active')
    activePanel.classList.add('is-hidden')
  }

  showTargetPanel(target){
    document.getElementsByName(target.id)[0].classList.remove('is-hidden')
    document.getElementsByName(target.id)[0].classList.add('is-active')
  }

  render() {
    return html`
    <div class="panel">
      <div class="panel-heading is-flex is-justify-content-flex-end">
        <login-element @userChange=${this.setUser}></login-element>
      </div>
      <div ?hidden=${this.anonymus}>   
        <p class="panel-tabs">
              <a id="add" @click=${this.tooglePanel}>add</a>
              <a id="calendar" class="is-active" @click=${this.tooglePanel}>calendar</a>
        </p>
        <edit-budget class="panel-block is-hidden" id="edit-board" name="add" @budgetCreated=${this.refresh}></edit-budget>
        <calendar-panel class="panel-block is-active" id="calendar-panel" name="calendar"></calendar-panel>
        <!--panel-element @updateBudget=${this.updateBudgetHandler}></panel-element-->
      </div>
    </div>
    `;
  }

}

window.customElements.define('dashboard-element', DashboardElement);
