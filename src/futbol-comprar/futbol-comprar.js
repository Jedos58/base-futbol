import { LitElement, html, css } from 'lit-element';

class FutbolComprar extends LitElement {

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            
        `;
    }

    deletePerson(e) {
        
        console.log("deletePerson en persona-ficha-listado");
        console.log("Se va a borrar la persona de nombre " + this.fname); 
        
            this.dispatchEvent(
                new CustomEvent("delete-person", {
                        detail: {
                            name: this.fname
                        }
                    }
                )
            );
    }
}

customElements.define('futbol-comprar', FutbolComprar);