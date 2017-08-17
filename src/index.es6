export default class PostEvent {
  constructor( config ){
    const me = this

    if ( !config ) config = {}

    me.debug = config.debug || false
    me.messageType = config.namespace || me.constructor.name
    me.server = window.parent
  }

  warn( message ){
    const me = this,
          warn = 'warn' in console ? console.warn : console.log

    if ( me.debug )
      warn( me.messageType + ' ' + message )
  }

  trigger( name, params = null ){
    const me = this

    if ( name ) {
      let message = {
        type: me.messageType,
        name,
        params
      }

      me.server.postMessage( message, '*' )
    } else
      me.warn( 'Trying to call "trigger" without a "name". Call ignored.' )

    return me
  }

  on( name, callback ){
    const me = this

    if ( name ) {
      me.server.addEventListener( 'message', function ( event ){
        if ( typeof event.data === 'object' ) {
          if ( event.data.type === that.messageType ) {
            let message = event.data

            if ( message.name === name ) {
              if ( callback ) callback.call( message.params, message.params )
            }
          }
        }
      }, { passive: true })
    } else
      me.warn( 'Trying to call "on" without a "name". Call ignored.' )

    return me
  }
}