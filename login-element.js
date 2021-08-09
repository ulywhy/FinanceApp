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
 
 function onSignIn(googleUser) {
  document.querySelector('login-element').setUser(googleUser.getBasicProfile())
   document.getElementById('my-signin2').classList.add('is-hidden')
   document.getElementById('logout').classList.remove('is-hidden')
 }
 function onFailure(error) {
   console.log(error);
 }
 function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     document.querySelector('login-element').setUser(null)
     document.getElementById('my-signin2').classList.remove('is-hidden')
     document.getElementById('logout').classList.add('is-hidden')
   });
 }
 export class LoginElement extends LitElement {
   static get styles() {
     return css`
     `;
   }
 
   static get properties() {
     return {
     };
   }
 
   constructor() {
     super();
     
     this.user = { image:"https://image.shutterstock.com/image-vector/green-cactus-clay-flower-pot-260nw-1103556998.jpg"}
     GUser.current = this.user
   }
 
  createRenderRoot() { return this;}
 
   async firstUpdated() {
     super.firstUpdated()
     this.renderLogin()
   }
 
  renderLogin(){
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 110,
      'height': 32,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': onSignIn,
      'onfailure': onFailure
    })  
  }

  /* Dispatch events */
  async dispatchUserChange(user){
    console.log(user)
    this.dispatchEvent(new CustomEvent('userChange', {
      detail: user,
      bubbles: true, 
      composed: true })
    );
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
      }
    }
    this.dispatchUserChange(GUser.current)
  }

  render() {
    return html`
    <div class="is-flex">
      <div id="my-signin2"></div>
      <button id="logout" class="is-hidden" @click=${signOut}>Sign out</button>
      <figure class="image is-32x32">
          <img src=${GUser.current.image} class="is-rounded">
      </figure>
    </div>
    `;
  }
 
 }
 
 window.customElements.define('login-element', LoginElement);
 