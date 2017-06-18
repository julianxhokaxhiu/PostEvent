# PostEvent
A Cross-Domain Event Handler javascript library. Pure Vanilla JS, no dependencies.

## Background

You may wonder why this library? Because I was trying to accomplish a full event-driven development in my project, and I was surprised to see that the browser as the only safe way to communicate in a cross-domain fashion, offers only the postMessage.

Although this standard doesn't give you the same flexibility and freedom of implementation, as the CustomEvent does. Therefore this library try to fit the gap between CustomEvent and Cross-Domain, by providing a simple to use API.

##	Install

In order to use this library, you can just include the [latest release](https://github.com/julianxhokaxhiu/PostEvent/releases) in your browser like this

```html
<!DOCTYPE html>
<html>
	<head>
		...
	</head>
	<body>
		...
		<script src="dist/PostEvent.js"></script>
		<script>
			var pe = new PostEvent();

			// console.log( pe );
		</script>
	</body>
</html>
```

or if you prefer as a module

```javascript
// $ npm i post-event

import PostEvent from 'post-event'

let pe = new PostEvent();
// console.log( pe );
```

## Initialization

When you instanciate the library, you can pass some configuration options, if you prefer:

- **debug:** if _true_ it will print some warnings, if the library is misused.

This is an example of custom initialization:

```javascript
var pe = new PostEvent({
  debug: true
});
```

## Method chain

If you prefer, you can chain methods, in a jQuery-like way-ish. This is an example of method chain:

```javascript
var pe = new PostEvent();

pe
.on( 'myCustomEvent', function (params){
  console.log( params.foo ); // bar
})
.trigger( 'myCustomEvent', { foo: 'bar' } );
```

## API

This library is made of two simple APIs:

### trigger( _name, params_ )

This API mimics [$.trigger()](http://api.jquery.com/trigger/) from jQuery. The function accepts two arguments:

- **name:** the event name you want to trigger.
- **params:** the payload that you want to send.

This is an example usage:

```javascript
var pe = new PostEvent();

pe.trigger( 'myCustomEvent', { foo: 'bar' } );
```

### on( _name, callback_ )

This API mimics [$.on()](http://api.jquery.com/on/) from jQuery, but it's even more simplier. The function accepts two arguments:

- **name:** the event name you want to subscribe.
- **callback:** the callback function to call, when the event is detected. The callback function will contain one argument, which will be the payload sent by **trigger**.

This is an example of usage:

```javascript
var pe = new PostEvent();

pe.on( 'myCustomEvent', function (params){
  console.log( params.foo ); // bar
});
```

## License

See [LICENSE](LICENSE)