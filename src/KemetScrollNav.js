import { LitElement, html, css } from 'lit-element';

export class KemetScrollNav extends LitElement {
  static get styles() {
    return [
      css `
        :host {
          display: block;
        }

        :host([transform]) {
          position: fixed;
          top: 0;
          width: 100%;
        }
      `
    ];
  }

  static get properties() {
    return {
      effect: {
        type: String,
        reflect: true
      },
      transform: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();

    this.effect = 'sticky';
    this.transform = false;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  firstUpdated() {
    const stickpoint = this.offsetTop;

    window.addEventListener('scroll', () => {
      // we pass stickpoint as a recorded const on init so that it does not update for each call to handleScroll
      this.handleScroll(stickpoint);
    });
  }

  handleScroll(stickpoint) {
    let transformPoint;

    switch (this.effect) {
      case 'sticky' : transformPoint = stickpoint; break;
      case 'resize' : transformPoint = this.offsetHeight; break;
      default : transformPoint = stickpoint;
    }

    if (window.pageYOffset >= transformPoint) {
      this.transform = true;
    } else {
      this.transform = false;
    }
  }
}
