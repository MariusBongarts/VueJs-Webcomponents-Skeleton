import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

@customElement('app-root')
export class WebMarker extends LitElement {
  static styles = css`${unsafeCSS(componentCSS)}`;

  render() {
    return html`
    <div class="container">
      <h1>lobby-container</h1>
        <div class="component">
          <lobby-container></lobby-container>
        </div>
  </div>
  `;
  }

}
