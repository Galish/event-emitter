import isEventNamePatternValid from './is-event-name-valid'

describe('Event name validation', () => {

	it('should return `false` with no arguments', () => {
		expect(isEventNamePatternValid()).toBeFalsy()
	})

	it('should return `false` for an empty string', () => {
		expect(isEventNamePatternValid('')).toBeFalsy()
	})

	it('should return `false` for non-string input', () => {
		expect(isEventNamePatternValid(12345)).toBeFalsy()
	})

	it('should return `true` for a single character input', () => {
		expect(isEventNamePatternValid('a')).toBeTruthy()
	})

	it('should return `true` for a space character input', () => {
		expect(isEventNamePatternValid(' ')).toBeTruthy()
	})

	it('should return `false` for a single delimiter input', () => {
		expect(isEventNamePatternValid('.')).toBeFalsy()
	})

	it('should return `true` for a string', () => {
		expect(isEventNamePatternValid('a1b')).toBeTruthy()
	})

	it('should return `true` for a string containing non-letter characters', () => {
		expect(isEventNamePatternValid('?!+=')).toBeTruthy()
	})

	it('should return `true` for a string containing a delimiter', () => {
		expect(isEventNamePatternValid('111.aaa')).toBeTruthy()
	})

	it('should return `true` for a string containing multiple delimiters', () => {
		expect(isEventNamePatternValid('111.aaa.b')).toBeTruthy()
	})

	it('should return `false` for a string ending with a delimiter', () => {
		expect(isEventNamePatternValid('111.aaa.')).toBeFalsy()
	})

	it('should return `false` for a string starting with a delimiter', () => {
		expect(isEventNamePatternValid('.111.aaa')).toBeFalsy()
	})

	it('should return `false` for a string starting and ending with a delimiter', () => {
		expect(isEventNamePatternValid('.111.aaa.')).toBeFalsy()
	})

	it('should return `false` for a string containing multiple delimiters in a row', () => {
		expect(isEventNamePatternValid('111..abc')).toBeFalsy()
	})

	it('should return `true` for a wildcard', () => {
		expect(isEventNamePatternValid('*')).toBeTruthy()
	})

	it('should return `true` for a string containing a wildcard', () => {
		expect(isEventNamePatternValid('111.*.abc')).toBeTruthy()
	})

	it('should return `true` for a string containing multiple wildcards', () => {
		expect(isEventNamePatternValid('111.*.*.abc')).toBeTruthy()
	})

	it('should return `true` for a string starting with a wildcard', () => {
		expect(isEventNamePatternValid('*.abc')).toBeTruthy()
	})

	it('should return `true` for a string ending with a wildcard', () => {
		expect(isEventNamePatternValid('abc.*')).toBeTruthy()
	})

	it('should return `true` for a string starting and ending with a wildcard', () => {
		expect(isEventNamePatternValid('*.abc.*')).toBeTruthy()
	})

	it('should return `false` for a string starting with a wildcard', () => {
		expect(isEventNamePatternValid('*abc')).toBeFalsy()
	})

	it('should return `false` for a string ending with a wildcard', () => {
		expect(isEventNamePatternValid('abc*')).toBeFalsy()
	})

	it('should return `true` for a double wildcard', () => {
		expect(isEventNamePatternValid('**')).toBeTruthy()
	})

	it('should return `true` for a string ending with a double wildcard', () => {
		expect(isEventNamePatternValid('abc.**')).toBeTruthy()
	})

	it('should return `false` for a string starting with a double wildcard', () => {
		expect(isEventNamePatternValid('**.def')).toBeFalsy()
	})

	it('should return `false` for a string containing double wildcard', () => {
		expect(isEventNamePatternValid('abc.**.def')).toBeFalsy()
	})

	it('should return `false` for a string ending with a double wildcard', () => {
		expect(isEventNamePatternValid('abc**')).toBeFalsy()
	})

	it('should return `false` for a string starting with a double wildcard', () => {
		expect(isEventNamePatternValid('**def')).toBeFalsy()
	})

	it('should return `false` for a string containing double wildcard', () => {
		expect(isEventNamePatternValid('abc**def')).toBeFalsy()
	})

	it('should return `false` for a string starting with multiple wildcards', () => {
		expect(isEventNamePatternValid('***.def')).toBeFalsy()
	})

	it('should return `false` for a string ending with multiple wildcards`', () => {
		expect(isEventNamePatternValid('abc.***')).toBeFalsy()
	})

	it('should return `false` for a string containing multiple wildcards`', () => {
		expect(isEventNamePatternValid('abc.***.def')).toBeFalsy()
	})

})
