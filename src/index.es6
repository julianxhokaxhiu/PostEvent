export default class PostEvent {
  constructor( config ){
    if ( !config ) config = {};

    this.debug = config.debug || false;
    this.messageType = this.constructor.name;
    this.server = window.parent;
  }

  warn( message ){
    const warn = 'warn' in console ? console.warn : console.log;

    if ( this.debug )
      warn( this.messageType + ' ' + message );
  }

  trigger( name, params = null ){
    if ( name ) {
      let message = {
        type: this.messageType,
        name,
        params
      };

      this.server.postMessage( message, '*' );
    } else
      this.warn( 'Trying to call "trigger" without a "name". Call ignored.' )

    return this;
  }

  on( name, callback ){
    const that = this;

    if ( name ) {
      this.server.addEventListener( 'message', function ( event ){
        if ( typeof event.data === 'object' ) {
          if ( event.data.type === that.messageType ) {
            let message = event.data;
            if ( message.name === name ) {
              if ( callback ) callback.call( message.params, message.params );
            }
          }
        }
      }, { passive: true });
    } else
      this.warn( 'Trying to call "on" without a "name". Call ignored.' );

    return this;
  }
}