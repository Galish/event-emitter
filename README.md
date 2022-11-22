[![Node.js CI](https://github.com/Galish/event-emitter/actions/workflows/tests.yml/badge.svg)](https://github.com/Galish/event-emitter/actions/workflows/tests.yml)

# Event-emitter

## Features
- Namespaces with wildcards
- Multiple (dependent) event listeners
- Stream support

## API

### Namespaces

Event emitter supports event __Namespaces with Wildcards__.

To use namespaces/wildcards, pass the event name as a string separated by a delimiter `(the . character)` and include a wild card `(the * character)`. The following events would be observed for an event `foo.*.baz`:

```javascript
emitter.emit('foo.bar.baz');
emitter.emit('foo.baaaar.baz');
emitter.emit('foo.b.baz');
```

#### Multi-level Wildcards

A double wildcard `(the ** string)` matches any number of levels (zero or more) of events. So if for example `foo.**` is passed to the on method, the following events would be observed:

```javascript
emitter.emit('foo');
emitter.emit('foo.bar');
emitter.emit('foo.bar.baz');
emitter.emit('foo.bar.baz.zzz');
```

### Class EventEmitter

**Methods**

- `emit(event, ...values): void` - executes each of the listeners with the list of arguments.
- `on(...events, listener): void` - adds a listener for the specified event(s).
- `once(...events, listener): void` - adds a one time listener for the event(s), that will be removed once it's fired.
- `stream(...events): AsyncGenerator` - returns an asynchronous generator to iterate over executed events.
- `off(...events, listener): void` - removes listener for the specified event(s).

## Usage

#### Listener

```javascript
import EventEmitter from './event-emitter';

const emitter = new EventEmitter();

const handler = args => {
	/*
		Events #1 and #3 events invoked with the following arguments:
		-> 1, 2, 3
		-> 'foo', 'bar'
	*/
};

emitter.on('foo.*.baz', handler);

emitter.emit('foo.bar.baz', 1, 2, 3);
emitter.emit('foo.baz');
emitter.emit('foo.baaar.baz', 'foo', 'bar');

emitter.off('foo.*.baz', handler);

emitter.emit('foo.bar.baz', arg1, arg2, arg3);
```

#### One time listener

```javascript
import EventEmitter from './event-emitter';

const emitter = new EventEmitter();

const handler = args => {
	/*
		Only first event invoked with the following arguments:
		-> 1, 2, 3
	*/
};

emitter.once('foo.bar.*', handler);

emitter.emit('foo.bar.baz1', 1, 2, 3);
emitter.emit('foo.bar.baz2', 'foo', 'bar');

emitter.off('foo.bar.*', handler);

emitter.emit('foo.bar.baz3');
```

#### Multiple event listener

```javascript
import EventEmitter from './event-emitter';

const emitter = new EventEmitter();

const handler = args => {
	/*
		Two events invoked with the following arguments:
		-> @iterator( 1, 2, 3 ), undefined, baz
		-> @iterator( 1, 2, 3 ), 2022, baz
	*/
};

emitter.on('foo.bar.baz1', 'foo.bar.baz3', 'foo.bar.baz5', handler);

emitter.emit('foo.bar.baz1', 1, 2, 3);
emitter.emit('foo.bar.baz2', 'foo', 'bar');
emitter.emit('foo.bar.baz3');
emitter.emit('foo.bar.baz4', 4, 5);
emitter.emit('foo.bar.baz5', 'baz');
emitter.emit('foo.bar.baz3', 2022);

emitter.off('foo.bar.*', handler);
```

**One time listener**

```javascript
import EventEmitter from './event-emitter';

const emitter = new EventEmitter();

const handler = args => {
	/*
		Only first event invoked with the following arguments:
		-> @iterator( 1, 2, 3 ), undefined, baz
	*/
};

emitter.once('foo.bar.baz1', 'foo.bar.baz3', 'foo.bar.baz5', handler);

emitter.emit('foo.bar.baz1', 1, 2, 3);
emitter.emit('foo.bar.baz2', 'for', 'bar');
emitter.emit('foo.bar.baz3');
emitter.emit('foo.bar.baz4', 4, 5);
emitter.emit('foo.bar.baz5', 'baz');
emitter.emit('foo.bar.baz3', 2022);
```

#### Stream

```javascript
import EventEmitter from './event-emitter';

const emitter = new EventEmitter();
const stream = emitter.stream('foo.**');

(async () => {
	for await (const e of stream) {
		/*
			Events #1-3 invoked with the following arguments:
			-> @iterator( 1, 2, 3 )
			-> 'foo'
			-> @iterator( 'bar', 'baz' )
		*/
	}
})();

emitter.emit('foo.bar.baz', 1, 2, 3);
emitter.emit('foo.bar.bazzz', 'foo');
emitter.emit('foo.baar.baz', 'bar', 'baz');

stream.cancel()

emitter.emit('foo.bar.baz';
```
