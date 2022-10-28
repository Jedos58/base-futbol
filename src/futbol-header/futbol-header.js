import { LitElement, html, css } from 'lit-element';

class FutbolHeader extends LitElement {

    static get properties() {
        return {
        };
    }

    static get styles(){
        return css`
            
            .container{
                text-align: center;
            }
            .nav-item{
                margin-right: 10px;
            }
            .navbar{
                margin-bottom:15px;
            }
        `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                 </button>
            <a class="navbar-brand"><strong>Mercado de Tranferencias</strong></a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <button @click='${this.mostrarMiEquipo}' class="btn btn-outline-primary col-12"><strong>Ver mi equipo</strong></button>
                    </li>
                    <li class="nav-item">
                        <button @click='${this.mostrarJugadores}' class="btn btn-outline-primary col-12"><strong>Ver jugadores</strong></button>
                    </li>
                </ul>
            <div class="form-inline my-2 my-lg-0">
                    <button @click='${this.cerrarSesion}' class="btn btn-danger col-12"><strong>Cerrar Sesión</strong></button>
            </div>

            </div>
            </nav>            
        `;
    }

    cerrarSesion(){
        window.sessionStorage.clear();
        document.location.href = "index.html"
    }

    mostrarMiEquipo(e) {
        
        console.log("mostrarMiEquipo");
        
            this.dispatchEvent(
                new CustomEvent("mostrar-equipo", {
                        detail: {
                            nombre: "Mi Equipo"
                        }
                    }
                )
            );
    }

    mostrarJugadores(e) {
        
        console.log("mostrarJugadores");
        
            this.dispatchEvent(
                new CustomEvent("mostrar-jugadores", {
                        detail: {
                        }
                    }
                )
            );
    }
}

customElements.define('futbol-header', FutbolHeader);
