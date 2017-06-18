export default class PostEvent {
  constructor( config ){
    // POLYFILLS
    // Required if the browser does not support startsWith natively
    // Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
          position = position || 0;
          return this.substr(position, searchString.length) === searchString;
      };
    }

    if ( !config ) config = {};

    this.debug = config.debug || false;

    this.messagePrefix = 'PostEvent:';
    this.server = window.parent;
  }

  log( message){
    const warn = 'warn' in console ? console.warn : console.log;

    if ( this.debug )
      warn( this.messagePrefix + ' ' + message );
  }

  trigger( name, params ){
    if ( name ) {
      let message = {
        name: name,
        params: params || null
      };

      this.server.postMessage( this.messagePrefix + JSON.stringify(message), '*' );
    } else
      this.log( 'Trying to call "trigger" without a "name". Call ignored.' )

    return this;
  }

  on( name, callback ){
    const that = this;

    if ( name ) {
      this.server.addEventListener( 'message', function ( event ){
        if ( event.data.startsWith( that.messagePrefix ) ) {
          let message = JSON.parse( event.data.substr( that.messagePrefix.length ) );
          if ( message.name === name ) {
            if ( callback ) callback.call( message.params, message.params );
          }
        }
      });
    } else
      this.log( 'Trying to call "on" without a "name". Call ignored.' );

    return this;
  }
}