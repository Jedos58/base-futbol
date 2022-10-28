import { LitElement, html, css } from 'lit-element';

class MiEquipoListado extends LitElement {

    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
            equipo: {type: String},
            posicion: {type: String},
            precio: {type:Number},
        };
    }

    static get styles(){
        return css`
            .list-group-item{ color: black; }
            .card-title{
                text-align:center;
            }
            .card-footer{
                text-align:center;
            }
            .card{
                width:300px;
            }
        `;
        
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
            <div class="card bg-light mb-3">
                <div class="card-header">
                    <h5 class="card-title">${this.name}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-text">${this.equipo}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Posicion: ${this.posicion}</li>
                        <li class="list-group-item">${this.precio} Millones de dolares</li>
                    </ul>
                </div>
                
                <div class="card-footer">
                    <button @click='${this.alertaDespedir}' class="btn btn-outline-danger col-5"><strong>Despedir</strong></button>
                </div>

            </div>
        `;
    }

    alertaDespedir(){
        if (confirm("¿Seguro que desea despedir al jugador?")) {
            this.liberarJugador();
        } else {
            window.alert("Se ha cancelado la acción");
         }
    }

    despedirJugador(e) {
                
            this.dispatchEvent(
                new CustomEvent("despedir-jugador", {
                        detail: {
                            id: this.id
                        }
                    }
                )
            );
    }

    liberarJugador(e) {
    
        this.dispatchEvent(new CustomEvent('liberar-jugador', 
            { 
                detail: { 'id': this.id, 'name': this.name, 'equipo': 'Agente Libre','posicion': this.posicion, 'precio': this.precio } 
            }
        ));

        this.despedirJugador();

    }

}

customElements.define('miequipo-listado', MiEquipoListado);