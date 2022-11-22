import isEventNameValid from './is-event-name-valid'

describe('Event name validation', () => {

	it('should return `false` with no arguments', () => {
		expect(isEventNameValid()).toBeFalsy()
	})

	it('should return `false` for an empty string', () => {
		expect(isEventNameValid('')).toBeFalsy()
	})

	it('should return `false` for non-string input', () => {
		expect(isEventNameValid(12345)).toBeFalsy()
	})

	it('should return `true` for a single character input', () => {
		expect(isEventNameValid('a')).toBeTruthy()
	})

	it('should return `true` for a space character input', () => {
		expect(isEventNameValid(' ')).toBeTruthy()
	})

	it('should return `false` for a single delimiter input', () => {
		expect(isEventNameValid('.')).toBeFalsy()
	})

	it('should return `true` for a string', () => {
		expect(isEventNameValid('a1b')).toBeTruthy()
	})

	it('should return `true` for a string containing non-letter characters', () => {
		expect(isEventNameValid('?!+=')).toBeTruthy()
	})

	it('should return `true` for a string containing a delimiter', () => {
		expect(isEventNameValid('111.aaa')).toBeTruthy()
	})

	it('should return `true` for a string containing multiple delimiters', () => {
		expect(isEventNameValid('111.aaa.b')).toBeTruthy()
	})

	it('should return `false` for a string ending with a delimiter', () => {
		expect(isEventNameValid('111.aaa.')).toBeFalsy()
	})

	it('should return `false` for a string starting with a delimiter', () => {
		expect(isEventNameValid('.111.aaa')).toBeFalsy()
	})

	it('should return `false` for a string starting and ending with a delimiter', () => {
		expect(isEventNameValid('.111.aaa.')).toBeFalsy()
	})

	it('should return `false` for a string containing multiple delimiters in a row', () => {
		expect(isEventNameValid('111..abc')).toBeFalsy()
	})

	it('should return `true` for a wildcard', () => {
		expect(isEventNameValid('*')).toBeTruthy()
	})

	it('should return `true` for a string containing a wildcard', () => {
		expect(isEventNameValid('111.*.abc')).toBeTruthy()
	})

	it('should return `true` for a string containing multiple wildcards', () => {
		expect(isEventNameValid('111.*.*.abc')).toBeTruthy()
	})

	it('should return `true` for a string starting with a wildcard', () => {
		expect(isEventNameValid('*.abc')).toBeTruthy()
	})

	it('should return `true` for a string ending with a wildcard', () => {
		expect(isEventNameValid('abc.*')).toBeTruthy()
	})

	it('should return `true` for a string starting and ending with a wildcard', () => {
		expect(isEventNameValid('*.abc.*')).toBeTruthy()
	})

	it('should return `false` for a string starting with a wildcard', () => {
		expect(isEventNameValid('*abc')).toBeFalsy()
	})

	it('should return `false` for a string ending with a wildcard', () => {
		expect(isEventNameValid('abc*')).toBeFalsy()
	})

	it('should return `true` for a double wildcard', () => {
		expect(isEventNameValid('**')).toBeTruthy()
	})

	it('should return `true` for a string ending with a double wildcard', () => {
		expect(isEventNameValid('abc.**')).toBeTruthy()
	})

	it('should return `false` for a string starting with a double wildcard', () => {
		expect(isEventNameValid('**.def')).toBeFalsy()
	})

	it('should return `false` for a string containing double wildcard', () => {
		expect(isEventNameValid('abc.**.def')).toBeFalsy()
	})

	it('should return `false` for a string ending with a double wildcard', () => {
		expect(isEventNameValid('abc**')).toBeFalsy()
	})

	it('should return `false` for a string starting with a double wildcard', () => {
		expect(isEventNameValid('**def')).toBeFalsy()
	})

	it('should return `false` for a string containing double wildcard', () => {
		expect(isEventNameValid('abc**def')).toBeFalsy()
	})

	it('should return `false` for a string starting with multiple wildcards', () => {
		expect(isEventNameValid('***.def')).toBeFalsy()
	})

	it('should return `false` for a string ending with multiple wildcards`', () => {
		expect(isEventNameValid('abc.***')).toBeFalsy()
	})

	it('should return `false` for a string containing multiple wildcards`', () => {
		expect(isEventNameValid('abc.***.def')).toBeFalsy()
	})

})
