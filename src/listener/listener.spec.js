import jest from 'jest-mock'

import EventListener from './listener'

describe('Event listener', () => {

	it('should not throw an error when creating class instance', () => {
		expect(() => new EventListener()).not.toThrow()
	})

	it('should return `isDone: false` by default', () => {
		const listener = new EventListener()

		expect(listener.isDone).toBeFalsy()
	})

	it('should throw an error when executing a listener without a handler', () => {
		const listener = new EventListener()

		expect(() => listener.execute()).toThrow()
	})

	it('should not throw an error when executing a listener handler', () => {
		const listener = new EventListener(
			'event.name',
			() => {}
		)

		expect(() => listener.execute()).not.toThrow()
	})

	it('should execute a listener', () => {
		const spyFn = jest.fn()

		const listener = new EventListener(
			'event.name',
			spyFn
		)

		listener.execute('event.name')

		expect(spyFn).toHaveBeenCalled()
	})

	it('should not execute a listener for another event', () => {
		const spyFn = jest.fn()

		const listener = new EventListener(
			'event.name',
			spyFn
		)

		listener.execute('event-name')

		expect(spyFn).not.toHaveBeenCalled()
	})

	it('should execute a listener multiple times', () => {
		const spyFn = jest.fn()

		const listener = new EventListener(
			'event.name',
			spyFn
		)

		listener.execute('event.name')
		listener.execute('event.name')
		listener.execute('event.name')

		expect(spyFn).toHaveBeenCalledTimes(3)
		expect(listener.isDone).toBeFalsy()
	})

	it('should execute a listener once', () => {
		const spyFn = jest.fn()

		const listener = new EventListener(
			'event.name',
			spyFn
		)

		listener.executeOnce(true)

		listener.execute('event.name')
		listener.execute('event.name')
		listener.execute('event.name')

		expect(spyFn).toHaveBeenCalledTimes(1)
		expect(listener.isDone).toBeTruthy()
	})

	it('should execute a listener with passed arguments', () => {
		const spyFn = jest.fn()

		const listener = new EventListener(
			'event.name',
			spyFn
		)

		listener.execute('event.name', 1, 2, 3)

		expect(spyFn).toHaveBeenCalledWith(1, 2, 3)
	})

	it('should return iterable list of events', () => {
		const listener = new EventListener(
			'event.name',
			() => {}
		)

		expect(listener.values()).toEqual(
			expect.objectContaining({
				[ Symbol.iterator ]: expect.any(Function)
			})
		)
	})

	it('should iterate over the list of events', () => {
		const listener = new EventListener(
			'event.name',
			() => {}
		)

		expect(Array.from(listener.values())).toEqual([ 'event.name' ])
	})

})
