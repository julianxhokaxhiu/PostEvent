# PostEvent
A Cross-Domain Event Handler javascript library. Pure Vanilla JS, no dependencies.

## Introduction

This library was born with a simple goal in mind: provide a simple way to handle events, without the effort to code multiple times special code in case we are in a Cross-Domain situation.

Say hello to PostEvent.

## Feature set

### Cross-Domain

Event handling by default is not possible when an iFrame is not sharing the same origin URL, or the headers are not set to allow Cross-Domain communication.

This library therefore is using **postMessage** API to enable communication, preserving the same capability of a generic event handling.

### Method chain

If you prefer, you can chain methods, in a jQuery-like way-ish. This is an example of method chain:

```javascript
var pe = new PostEvent();

pe
.on( 'myCustomEvent', function (params){
  console.log( params.foo ); // bar
})
.trigger( 'myCustomEvent', { foo: 'bar' } );
```
### Single channel across multiple instances

You can instanciate as much times as you want the library. By default it is always using the same **window.parent** entrypoint. This allows you to write simple code, without the need to handle special cases.

```javascript
var pe1 = new PostEvent(),
    pe2 = new PostEvent();

pe1
.on('sayHello', function (params){
  console.log( 'Hello ' + ( params.name || 'World' ) ); // Hello User
});

p2.trigger('sayHello', { name: 'User' });
```

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