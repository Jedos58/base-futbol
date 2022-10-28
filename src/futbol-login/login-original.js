import {
    LitElement,
    html
  } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
  import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
  
  console.log('Hello WebComponents')
  
  class MyButton extends LitElement {
    render() {
      return html`
        <button>My Button</button>
      `
    }
  }
  
  customElements.define('my-button', MyButton)
  
  class PageA extends LitElement {
    render() {
      return html`
        <div>
          Page A
          <div></div>
        </div>
      `
    }
  }
  customElements.define('my-pagea', PageA)
  
  class PageB extends LitElement {
    render() {
      return html`
        <div>
          Page B
          <div></div>
        </div>
      `
    }
  }
  customElements.define('my-pageb', PageB)
  
  
  
  
  class Login extends LitElement {
    render() {
      return html`
        <div>
          <input type='text' placeholder='Usuario'/><br/>
          <input type='password' placeholder='Password'/>
      <input type='button' value='Login' @click="${this.entrar}"/>
        </div>
      `
    }
    
    entrar()
    {
      this.dispatchEvent(new CustomEvent('log-in',{'detail':{}}));
    }
    
  }
  customElements.define('my-login', Login)
  
  
  
  
  class MyAwesomeApp extends LitElement {
    static get properties() {
      return {
        route: { type: Object },
        loggedin: {type: Boolean}	
      }
    }
  
    constructor() {
      super()
      this.router = new Navigo('/', true, '#!')
      this.loggedin=false;	
  
      this.router.hooks({
      before: function(done, params){
          // some tomfoolery
      if(!this.loggedin)this.router.navigate('/');
          done();
      }.bind(this)
      });	
  
  
      this.router
        .on('pagea', () => {
          this.route = html`
            <my-pagea></my-pagea>
          `
        })
        .on('pageb', () => {
          this.route = html`
            <my-pageb></my-pageb>
          `
        })
        .on('*', function(){
          this.route = html`
            <my-login @log-in='${this.doLogIn}'></my-login>
          `
        }.bind(this))
  
      this.router.resolve()
    }
  
    
    doLogIn()
    {
       this.loggedin=true;
      this.router.navigate('pagea');
    }
  
  
    render() {
      return html`
        <div>
          <h1>MyAwesomeApp</h1>
          <!--<a href="#!/pagea">Page A</a> </br>
      <a href="#!/pageb">Page B</a> </br>
          <a href="#!/">Home</a>  </br>-->
  
      ${this.route}
  
        </div>
      `
    }
  }
  customElements.define('futbol-login', MyAwesomeApp)