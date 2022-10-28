import { LitElement, html } from 'lit-element';

import '../futbol-ficha-listado/futbol-ficha-listado.js';
import '../Miequipo-listado/miequipo-listado.js';

class FutbolMain extends LitElement {
    
    static get properties() {
        return {
            equipos: { type: Array },
            miequipo: { type: Array },
            showTeam: {type: Boolean},
            dueno: {type:String}
        };
    }

    constructor() {
        super();
        this.equipos = [];
        this.miequipo = [];
        this.showTeam = false;
        this.dueno = "";

        this.leerUsuario('owner');
        this.obtenerEquipos();
        this.obtenerMiEquipo();
    }

    render() {
        return html`

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

            <div class="row" id="playerList">
                <div class="row row-cols-1 row-cols-sm-4">
                ${this.equipos.map(
                    person => html`<futbol-ficha-listado
                                    id="${person.id}" 
                                    name="${person.name}" 
                                    equipo="${person.equipo}"
                                    posicion="${person.posicion}"
                                    precio="${person.precio}"
                                    @agregar-jugador=${this.agregarJugador}
                                    @delete-jugador=${this.deleteJugador}
                                >
                            </futbol-ficha-listado>`
                )}
                </div>
            </div>

            <div class="d-none row" id="myTeam">
            <div class="row row-cols-1 row-cols-sm-4">
                ${this.miequipo.map(
                    person => html`<miequipo-listado
                                    id="${person.id}" 
                                    name="${person.name}" 
                                    equipo="${person.equipo}"
                                    posicion="${person.posicion}"
                                    precio="${person.precio}"
                                    @despedir-jugador="${this.despedirJugador}"
                                    @liberar-jugador="${this.liberarJugador}"
                                >
                            </miequipo-listado>`
                )}
            </div>
            </div>

        `;
    }

    leerUsuario(datos) {
        var valor = window.sessionStorage.getItem(datos);
        this.dueno = valor;
        console.log("el ownwer es.....")
        console.log(this.dueno);
    }

    agregarJugador(e){
        console.log(e.detail);

        var jugador = JSON.stringify(e.detail);
        console.log("El body es: ", jugador);
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 201){
                let APIResponse = JSON.parse(xhr.responseText);
                this.obtenerMiEquipo();
            }
        }.bind(this);

        xhr.open("POST", "http://localhost:3001/miEquipo");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jugador);

        console.log("Jugador almacenado");
    }

    deleteJugador(e) { 
        console.log("deleteJugador en futbol-main");
        console.log("Se va a borrar el jugador de Id " + e.detail.id);

        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){
                let APIResponse = JSON.parse(xhr.responseText);
                this.obtenerEquipos(); // Esto vuelve a cargar la vista
                console.log(APIResponse);
            }
        }.bind(this);

        xhr.open("DELETE", "http://localhost:3000/equipos/" + e.detail.id);
        xhr.send();
    }

    liberarJugador(e){
        console.log(e.detail);

        var jugador = JSON.stringify(e.detail);
        console.log("El body es: ", jugador);
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 201){
                let APIResponse = JSON.parse(xhr.responseText);
                this.obtenerEquipos();
            }
        }.bind(this);

        xhr.open("POST", "http://localhost:3000/equipos");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jugador);
    }

    despedirJugador(e) { 
        console.log("deleteJugador en futbol-main");
        console.log("Se va a borrar el jugador de Id " + e.detail.id);

        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){
                let APIResponse = JSON.parse(xhr.responseText);
                this.obtenerMiEquipo();
                console.log(APIResponse);
            }
        }.bind(this);

        xhr.open("DELETE", "http://localhost:3001/miEquipo/" + e.detail.id);
        xhr.send();
    }

    updated(changedProperties) {
        console.log("Updated");

        if(changedProperties.has("showTeam")){
            console.log("Ha cambiado el valor de la propiedad showTeam en futbol-main");

            if(this.showTeam === true){
                this.showMyTeamData();
            } else {
                this.showPlayersList();
            }
        }

    }

    showPlayersList(){
        console.log("showPlayersList");
        console.log("Mostrando listado de jugadores");

        this.shadowRoot.getElementById("playerList").classList.remove("d-none");
        this.shadowRoot.getElementById("myTeam").classList.add("d-none");
    }

    showMyTeamData() {
        console.log("showMyTeamData");
        console.log("Mostrando lista de mi equipo");

        this.shadowRoot.getElementById("myTeam").classList.remove("d-none");	  
        this.shadowRoot.getElementById("playerList").classList.add("d-none");	
    } 

    /*personFormClose() {
        console.log("personFormClose");
        console.log("Se ha cerrado el formulario de la persona");
        this.showPersonForm = false;
    }

    personFormStore(e) {
        console.log("personFormStore");
        console.log("Se va a almacenar una persona");
        
        this.people.push(e.detail.person);
        console.log("Persona almacenada");	
	    this.showPersonForm = false;
    }*/

    obtenerMiEquipo()
    {
        let con = new XMLHttpRequest();

        con.onload = function(){

            if(con.status == 200){
                let APIResponse = JSON.parse(con.responseText);
                this.miequipo = APIResponse;
                this.miequipo = this.miequipo.filter(
                    person => person.owner == this.dueno
                )
                console.log(this.miequipo);
            }
        }.bind(this);

        con.open('GET', 'http://localhost:3001/miEquipo');
        con.setRequestHeader('Cache-Control', 'no-cache');
        con.send();
    }

    obtenerEquipos()
    {
        let con = new XMLHttpRequest();

        con.onload = function(){

            if(con.status == 200){
                let APIResponse = JSON.parse(con.responseText);
                this.equipos = APIResponse;
            }
        }.bind(this);

        con.open('GET', 'http://localhost:3000/equipos');
        con.setRequestHeader('Cache-Control', 'no-cache');
        con.send();
    }

}

customElements.define('futbol-main', FutbolMain)