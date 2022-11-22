import jest from 'jest-mock'

import MultiEventListener from './multi-event-listener'

describe('Multiple event listener', () => {

	it('should not throw an error when creating class instance', () => {
		expect(() => new MultiEventListener()).not.toThrow()
	})

	it('should return `isDone: false` by default', () => {
		const listener = new MultiEventListener()

		expect(listener.isDone).toBeFalsy()
	})

	it('should throw an error when executing a listener without a handler', () => {
		const listener = new MultiEventListener()

		expect(() => listener.execute()).toThrow()
	})

	it('should not throw an error when executing a listener handler', () => {
		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			() => {}
		)

		expect(() => listener.execute()).not.toThrow()
	})

	it('should not execute a listener if not all events are fired', () => {
		const spyFn = jest.fn()

		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			spyFn
		)

		listener.execute('event.name.1')
		listener.execute('event.name.2')

		expect(spyFn).not.toHaveBeenCalled()
	})

	it('should execute a listener', () => {
		const spyFn = jest.fn()

		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			spyFn
		)

		listener.execute('event.name.1')
		listener.execute('event.name.2')
		listener.execute('event.name.3')

		expect(spyFn).toHaveBeenCalled()
	})

	it('should execute a listener multiple times', () => {
		const spyFn = jest.fn()

		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			spyFn
		)

		listener.execute('event.name.1')
		listener.execute('event.name.2')
		listener.execute('event.name.3')
		listener.execute('event.name.1')
		listener.execute('event.name.2')

		expect(spyFn).toHaveBeenCalledTimes(3)
		expect(listener.isDone).toBeFalsy()
	})

	it('should execute a listener once', () => {
		const spyFn = jest.fn()

		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			spyFn
		)

		listener.executeOnce(true)

		listener.execute('event.name.1')
		listener.execute('event.name.2')
		listener.execute('event.name.3')
		listener.execute('event.name.1')
		listener.execute('event.name.2')

		expect(spyFn).toHaveBeenCalledTimes(1)
		expect(listener.isDone).toBeTruthy()
	})

	it('should execute a listener with passed arguments', () => {
		const spyFn = jest.fn((...args) => (
			args.map(
				data => isIterator(data) ? Array.from(data) : data
			)
		))

		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			spyFn
		)

		listener.execute('event.name.1', 1, 2, 3)
		listener.execute('event.name.2')
		listener.execute('event.name.3', 'Some string', 'and text')

		expect(spyFn).toHaveBeenCalledWith(
			expect.objectContaining({
				[ Symbol.iterator ]: expect.any(Function)
			}),
			undefined,
			expect.objectContaining({
				[ Symbol.iterator ]: expect.any(Function)
			})
		)

		expect(spyFn).toHaveReturnedWith(
			[
				[ 1, 2, 3 ],
				undefined,
				[ 'Some string', 'and text' ]
			]
		)
	})

	it('should return iterable list of events', () => {
		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			() => {}
		)

		expect(listener.values()).toEqual(
			expect.objectContaining({
				[ Symbol.iterator ]: expect.any(Function)
			})
		)
	})

	it('should iterate over the list of events', () => {
		const listener = new MultiEventListener(
			[ 'event.name.1', 'event.name.2', 'event.name.3' ],
			() => {}
		)

		expect(
			Array.from(listener.values())
		).toEqual([ 'event.name.1', 'event.name.2', 'event.name.3' ])
	})

})

function isIterator(obj) {
	return (
		obj !== null
		&&
		typeof obj?.next === 'function'
	)
}
