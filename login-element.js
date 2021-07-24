/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

export class LoginElement extends LitElement {
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


  render() {
    return html`
    <h3>login</h3>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
 
    `;
  }

}

window.customElements.define('login-element', LoginElement);
