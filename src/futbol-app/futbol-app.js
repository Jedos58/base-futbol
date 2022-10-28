import { LitElement, html } from 'lit-element';
import '../futbol-header/futbol-header.js';
import '../futbol-main/futbol-main.js';
import '../futbol-footer/futbol-footer.js';

class FutbolApp extends LitElement {

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

            <futbol-header @mostrar-equipo='${this.showEquipo}' @mostrar-jugadores='${this.showJugadores}'></futbol-header>
            <futbol-main></futbol-main>
            <futbol-footer></futbol-main>
        `;
        
    }

    showEquipo() {
        this.shadowRoot.querySelector("futbol-main").showTeam = true;
    }

    showJugadores() {
        this.shadowRoot.querySelector("futbol-main").showTeam = false;
    }

    /*render() {
        return html`

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
            <persona-header></persona-header>

            <div class="row">
                <persona-sidebar class="col-2" @new-person='${this.newPerson}'></persona-sidebar>
                <persona-main class="col-10"></persona-main>
            </div>
            
            <persona-footer></persona-footer>
        `;
    }
    
    newPerson(e) {
        console.log("newPerson en PersonaApp");	
        this.shadowRoot.querySelector("persona-main").showPersonForm = true;
    }*/
}

customElements.define('futbol-app', FutbolApp);