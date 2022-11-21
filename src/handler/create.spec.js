import Handler from './handler'
import MultipleEventHandler from './multiple-event-handler'
import createHandler from './create'

describe('Create handler', () => {

	it('should throw an error with no arguments', () => {
		expect(
			() => createHandler()
		).toThrow('Invalid event name pattern: undefined')
	})

	it('should throw an error with event name argument only', () => {
		expect(
			() => createHandler('event-name')
		).toThrow('Invalid event name pattern: undefined')
	})

	it('should throw an error with function argument only', () => {
		expect(
			() => createHandler(() => {})
		).toThrow('Invalid event name pattern: undefined')
	})

	it('should throw an error with function argument only', () => {
		const handler = createHandler(
			'event-name',
			() => {}
		)

		expect(handler instanceof Handler).toBeTruthy()
	})

	it('should throw an error with function argument only', () => {
		const handler = createHandler(
			'event-name 1',
			'event-name 2',
			'event-name 3',
			() => {}
		)

		expect(handler instanceof MultipleEventHandler).toBeTruthy()
	})

})
