import jest from 'jest-mock'

import EventEmitter from './event-emitter'

describe('Event emitter', () => {

	it('should throw an invalid event name pattern error', () => {
		const emitter = new EventEmitter()

		expect(
			() => emitter.on('foo.*.', () => {})
		).toThrow('Invalid event name pattern: foo.*.')
	})

	it('should throw an invalid event name error', () => {
		const emitter = new EventEmitter()

		expect(
			() => emitter.emit('foo.bla.')
		).toThrow('Invalid event name format: foo.bla.')
	})

	it('should match event name', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('event-name', spyFn)
		emitter.emit('event-name')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should match event name pattern', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('event.name', spyFn)
		emitter.emit('event')
		emitter.emit('name')
		emitter.emit('event.name')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should match event name `*` pattern', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('event.*', spyFn)
		emitter.emit('event.name')
		emitter.emit('some.event.name')
		emitter.emit('event.name.long')
		emitter.emit('event')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should match event name `**` pattern', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('event.**', spyFn)
		emitter.emit('event.name')
		emitter.emit('some.event.name')
		emitter.emit('event.name.long')
		emitter.emit('event')

		expect(spyFn).toHaveBeenCalledTimes(2)
	})

	it('should trigger a single event', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.once('foo.bla.bar', spyFn)
		emitter.emit('foo.bla.bar')
		emitter.emit('foo.bla.bar')
		emitter.emit('foo.bla.bar')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should trigger multiple events', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('foo.bla.bar', spyFn)
		emitter.emit('foo.bla.bar')
		emitter.emit('foo.bla.bar')
		emitter.emit('foo.bla.bar')

		expect(spyFn).toHaveBeenCalledTimes(3)
	})

	it('should receive data', () => {
		const spyFn = jest.fn()
		const emitter = new EventEmitter()
		const obj = { a: 1, b: 2, c: 3 }

		emitter.on('foo.bla.bar', spyFn)
		emitter.emit('foo.bla.bar', 10)
		emitter.emit('foo.bla.bar', '20')
		emitter.emit('foo.bla.bar', 'Some string', 'and text')
		emitter.emit('foo.bla.bar', obj)

		expect(spyFn).toHaveBeenNthCalledWith(1, 10)
		expect(spyFn).toHaveBeenNthCalledWith(2, '20')
		expect(spyFn).toHaveBeenNthCalledWith(3, 'Some string', 'and text')
		expect(spyFn).toHaveBeenNthCalledWith(4, obj)
	})

	it('should terminate listeners', () => {
		const spyFn = jest.fn()
		const spyOnceFn = jest.fn()
		const emitter = new EventEmitter()

		emitter.on('foo.bla.bar', spyFn)
		emitter.once('foo.bla.bar', spyOnceFn)
		emitter.off('foo.bla.bar', spyOnceFn)
		emitter.emit('foo.bla.bar')
		emitter.off('foo.bla.bar', spyFn)
		emitter.emit('foo.bla.bar')

		expect(spyFn).toHaveBeenCalledTimes(1)
		expect(spyOnceFn).not.toHaveBeenCalled()
	})

	describe('Multiple event listeners', () => {

		it('should trigger a single event', () => {
			const spyOn = jest.fn()
			const emitter = new EventEmitter()

			emitter.once('foo.bla.bar1', 'foo.bla.bar2', 'foo.bla.bar3', spyOn)

			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla.bar2')
			emitter.emit('foo.bla.bar3')
			emitter.emit('foo.bla.bar4')
			emitter.emit('foo.bla.bar3')

			expect(spyOn).toHaveBeenCalledTimes(1)
		})

		it('should trigger multiple events', () => {
			const spyOn = jest.fn()
			const emitter = new EventEmitter()

			emitter.on('foo.bla.bar1', 'foo.bla.bar2', 'foo.bla.bar3', spyOn)

			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla.bar2')
			emitter.emit('foo.bla.bar3')
			emitter.emit('foo.bla.bar4')
			emitter.emit('foo.bla.bar3')

			expect(spyOn).toHaveBeenCalledTimes(2)
		})

		it('should receive data', () => {
			const spyFn = jest.fn((...args) => (
				args.map(
					data => isIterator(data) ? Array.from(data) : data
				)
			))

			const emitter = new EventEmitter()
			const someArr = [ 'a', 'b', 'c' ]

			emitter.on('foo.bla.bar1', 'foo.bla.bar2', 'foo.bla.bar3', spyFn)

			emitter.emit('foo.bla.bar1', 10)
			emitter.emit('foo.bla.bar2', '20')
			emitter.emit('foo.bla.bar3', 'Some string', 'and text')
			emitter.emit('foo.bla.bar4', 40)
			emitter.emit('foo.bla.bar3', someArr)
			emitter.emit('foo.bla.bar1')

			expect(spyFn).toHaveBeenCalledTimes(3)

			expect(spyFn).toHaveBeenNthCalledWith(
				1,
				10,
				'20',
				expect.objectContaining({
					[ Symbol.iterator ]: expect.any(Function)
				})
			)
			expect(spyFn).toHaveNthReturnedWith(
				1,
				[ 10, '20' , [ 'Some string', 'and text' ] ]
			)

			expect(spyFn).toHaveBeenNthCalledWith(2, 10, '20', someArr)
			expect(spyFn).toHaveBeenNthCalledWith(3, undefined, '20', someArr)
		})

		it('should terminate a listener', () => {
			const spyOn = jest.fn()
			const emitter = new EventEmitter()

			emitter.on('foo.bla.bar1', 'foo.bla.bar2', 'foo.bla.bar3', spyOn)

			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla.bar2')
			emitter.emit('foo.bla.bar3')
			emitter.emit('foo.bla.bar4')
			emitter.emit('foo.bla.bar3')

			emitter.off('foo.bla.bar1', 'foo.bla.bar2', 'foo.bla.bar3', spyOn)

			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla.bar2')

			expect(spyOn).toHaveBeenCalledTimes(2)
		})

	})

	describe('Streams', () => {

		it('should provide a stream of events', done => {
			const spyFn = jest.fn()
			const emitter = new EventEmitter()
			const stream = emitter.stream('foo.**')

			emitter.emit('foo.bla.bar')
			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla1.bar')

			stream.cancel();

			(async () => {
				for await (const e of stream) {
					spyFn(e)
				}

				done()
				expect(spyFn).toHaveBeenCalledTimes(3)
			})()
		})

		it('should provide multiple streams', done => {
			const spyFn1 = jest.fn()
			const spyFn2 = jest.fn()
			const emitter = new EventEmitter()
			const stream1 = emitter.stream('foo.**')
			const stream2 = emitter.stream('foo.bla.**')

			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla2.bar2')
			emitter.emit('foo.bla.bar3')

			stream1.cancel()
			stream2.cancel();

			(async () => {
				for await (const e of stream1) {
					spyFn1(e)
				}

				expect(spyFn1).toHaveBeenCalledTimes(3)
			})();

			(async () => {
				for await (const e of stream2) {
					spyFn2(e)
				}

				done()

				expect(spyFn2).toHaveBeenCalledTimes(2)
			})()
		})

		it('should receive data', done => {
			const spyFn = jest.fn(data => (
				isIterator(data) ? Array.from(data) : data
			))

			const emitter = new EventEmitter()
			const stream = emitter.stream('foo.**')
			const someObj = { a: 1, b: 2, c: 3 }

			emitter.emit('foo.bla.bar', 10)
			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla1.bar', 'Some string', 'and text')
			emitter.emit('foo.bla', someObj)

			stream.cancel();

			(async () => {
				for await (const e of stream) {
					spyFn(e)
				}

				done()

				expect(spyFn).toHaveBeenCalledTimes(4)
				expect(spyFn).toHaveBeenNthCalledWith(1, 10)
				expect(spyFn).toHaveBeenNthCalledWith(2, undefined)

				expect(spyFn).toHaveBeenNthCalledWith(
					3,
					expect.objectContaining({
						[ Symbol.iterator ]: expect.any(Function)
					})
				)

				expect(spyFn).toHaveNthReturnedWith(
					3,
					[ 'Some string', 'and text' ]
				)

				expect(spyFn).toHaveBeenNthCalledWith(4, someObj)
			})()
		})

		it('should terminate stream', done => {
			const spyFn = jest.fn()
			const emitter = new EventEmitter()
			const stream = emitter.stream('foo.**')

			emitter.emit('foo.bla.bar')
			emitter.emit('foo.bla.bar1')

			stream.cancel()

			emitter.emit('foo.bla1.bar')
			emitter.emit('foo.bla1.bar2')
			emitter.emit('foo.bla2.bar2');

			(async () => {
				for await (const e of stream) {
					spyFn(e)
				}

				done()

				expect(spyFn).toHaveBeenCalledTimes(2)
			})()
		})

		it('should terminate stream asynchronously', done => {
			const spyFn = jest.fn()
			const emitter = new EventEmitter()
			const stream = emitter.stream('foo.**')

			emitter.emit('foo.bla.bar')
			emitter.emit('foo.bla.bar1')
			emitter.emit('foo.bla1.bar')

			sleep(1000).then(() => stream.cancel());

			(async () => {
				for await (const e of stream) {
					spyFn(e)
				}

				done()

				expect(spyFn).toHaveBeenCalledTimes(3)
			})()
		})

	})

})

function sleep(ms) {
	return new Promise(reject => setTimeout(reject, ms))
}

function isIterator(obj) {
	return (
		obj !== null
		&&
		typeof obj?.next === 'function'
	)
}
