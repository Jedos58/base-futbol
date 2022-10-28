import { LitElement, html } from 'lit-element';

class FutbolFooter extends LitElement {

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

        <footer class="text-center text-lg-start bg-light text-muted">
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        © Futbol App 2022
        </div>
        </footer>
        `;
    }
}

customElements.define('futbol-footer', FutbolFooter)