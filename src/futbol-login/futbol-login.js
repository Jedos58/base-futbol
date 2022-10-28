import {LitElement, html, css} from 'lit-element'
import Navigo from '../navigo.es.js'
import '../futbol-app/futbol-app.js'


class Login extends LitElement {
  static get properties(){
    return{
    usuario: {type: Object}
  }
  }

  static get styles(){
      return css`
      .container {
        ...
        position: relative;
        text-align: center;
      }
      .hijo {
        /* centrar vertical y horizontalmente */
        position: absolute;
        top: 30%;
        left: 43%;
        margin: -25px 0 0 -25px; /*aplicar a top y al margen izquierdo un valor negativo para completar el centrado del elemento hijo */
      }
        .form-label {
            color: black;
        }
      `
  }

  constructor(){
    super();
    this.usuario = {};
  }
  
  render() {
    return html`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    
    <div class="container">
    <div class="hijo">
        <h1>Futbol App</h1>
    <div class="card text-white bg-light mb-3 col-12">
    <form>
        <div class="form-outline mb-4">
            <label class="form-label" for="usrform">Usuario</label>
            <input type="email" id="usrform" @input = ${this.updateUsuario} placeholder='Ingrese su usuario' class="form-control" />
        </div>

        <div class="form-outline mb-4">
            <label class="form-label" for="loginpass">Password</label>
            <input type='password' id = "loginpass" @input = ${this.updatePassword} placeholder='Ingrese su contraseña' class="form-control" />
        </div>
    
        <div>
            <button type="button" value='Login' class="btn btn-primary btn-block mb-4" @click="${this.entrar}">Sign in</button>
        </div>
    </form>
    </div>
    </div>
    </div>

    `
  }

  updateUsuario(e) {
		console.log("Actualizando la propiedad usurio con el valor " + e.target.value);
		this.usuario.user = e.target.value;
	}

  updatePassword(e) {
		console.log("Actualizando la propiedad password con el valor " + e.target.value);
		this.usuario.password = e.target.value;
	}
  
  entrar(e)
  {
	this.dispatchEvent(new CustomEvent('log-in',{'detail':{email: this.usuario.user, password: this.usuario.password}}));
  }
  
}
customElements.define('my-login', Login)


class FutbolLogin extends LitElement {
  static get properties() {
    return {
      route: { type: Object },
      loggedin: {type: Boolean}	
    }
  }

  constructor() {
    super();
    this.router = new Navigo('/', true, '#!');
    this.loggedin=false;	

    this.router.hooks({
    before: function(done, params){
        // some tomfoolery
	if(!this.loggedin)this.router.navigate('/');
        done();
    }.bind(this)
    });	


    this.router
      .on('futbol-app', () => {
        this.route = html`
          <futbol-app></futbol-app>
        `
      })
      .on('*', function(){
        this.route = html`
          <my-login @log-in='${this.doLogIn}'></my-login>
        `
      }.bind(this))

    this.router.resolve()
  }

  
  doLogIn(e)
  {
    console.log("el usuario recibido es: ")
    console.log(e.detail);

    
    var usuario = JSON.stringify(e.detail);
    console.log("El usuario es: ", usuario);
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            this.escribirUsuario(e.detail.email);
            this.loggedin=true;
            this.router.navigate('futbol-app');
        }
    }.bind(this);

    xhr.open("POST", "http://localhost:3002/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(usuario);
  }

  escribirUsuario(datos) {
    window.sessionStorage.setItem('owner', datos);
    console.log("se almaceno usurio en session storage...");
}


  render() {
    return html`
      <div>
	      ${this.route}
      </div>
    `
  }

}
customElements.define('futbol-login', FutbolLogin)
