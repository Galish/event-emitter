import Listener from './listener'
import MultiEventListener from './multi-event-listener'
import createListener from './create'

describe('Create listener', () => {

	it('should throw an error with no arguments', () => {
		expect(
			() => createListener()
		).toThrow('Invalid event name pattern: undefined')
	})

	it('should not throw an error with event name argument only', () => {
		expect(
			() => createListener('event-name')
		).not.toThrow('Invalid event name pattern: undefined')
	})

	it('should throw an error with function argument only', () => {
		expect(
			() => createListener(() => {})
		).toThrow('Invalid event name pattern: undefined')
	})

	it('should throw an error with function argument only', () => {
		const listener = createListener(
			'event-name',
			() => {}
		)

		expect(listener instanceof Listener).toBeTruthy()
	})

	it('should throw an error with function argument only', () => {
		const listener = createListener(
			'event-name 1',
			'event-name 2',
			'event-name 3',
			() => {}
		)

		expect(listener instanceof MultiEventListener).toBeTruthy()
	})

})
