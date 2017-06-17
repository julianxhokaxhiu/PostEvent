// startsWith polyfill @ MDN
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    return this.substr(position || 0, searchString.length) === searchString;
  };
}

// PostEvent main code
function PostEvent( config ) {
  if ( !config ) config = {};

  this.messagePrefix = config.messagePrefix || 'PostEvent:';
  this.debug = config.debug || false;

  this.server = window.parent;
}

PostEvent.prototype.log = function ( message ) {
  var warn = 'warn' in console ? console.warn : console.log;

  if ( this.debug )
    warn( this.messagePrefix + ' ' + message );
}

PostEvent.prototype.trigger = function ( name, params ) {
  if ( name ) {
    var message = {
      name: name,
      params: params || {}
    };

    this.server.postMessage( this.messagePrefix + JSON.stringify(message), '*' );
  } else
    this.log( 'Trying to call "trigger" without a "name". Call ignored.' )

  return this;
}

PostEvent.prototype.on = function ( name, cb ) {
  var that = this;

  if ( name ) {
    this.server.addEventListener( 'message', function ( event ){
      if ( event.data.startsWith( that.messagePrefix ) ) {
        var message = JSON.parse( event.data.substr( that.messagePrefix.length ) );
        if ( message.name === name ) {
          if ( cb ) cb( message.params );
        }
      }
    });
  } else
    this.log( 'Trying to call "on" without a "name". Call ignored.' );

  return this;
}