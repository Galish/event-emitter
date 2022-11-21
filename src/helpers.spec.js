import { isEventNamePatternValid } from './helpers'

describe('Event name validation helper', () => {

	it('returns `false` with no arguments', () => {
		expect(isEventNamePatternValid()).toBe(false)
	})

	it('returns `false` for an empty string', () => {
		expect(isEventNamePatternValid('')).toBe(false)
	})

	it('returns `false` for non-string input', () => {
		expect(isEventNamePatternValid(12345)).toBe(false)
	})

	it('returns `true` for a single character input', () => {
		expect(isEventNamePatternValid('a')).toBe(true)
	})

	it('returns `false` for a siggle delimiter input', () => {
		expect(isEventNamePatternValid('.')).toBe(false)
	})

	it('returns `true` for a string', () => {
		expect(isEventNamePatternValid('a1b')).toBe(true)
	})

	it('returns `true` for a string containing a delimiter', () => {
		expect(isEventNamePatternValid('111.aaa')).toBe(true)
	})

	it('returns `true` for a string containing multiple delimiters', () => {
		expect(isEventNamePatternValid('111.aaa.b')).toBe(true)
	})

	it('returns `false` for a string ending with a delimiter', () => {
		expect(isEventNamePatternValid('111.aaa.')).toBe(false)
	})

	it('returns `false` for a string strting with a delimiter', () => {
		expect(isEventNamePatternValid('.111.aaa')).toBe(false)
	})

	it('returns `false` for a string starting and ending with a delimiter', () => {
		expect(isEventNamePatternValid('.111.aaa.')).toBe(false)
	})

	it('returns `false` for a string containing multiple delimiters in a row', () => {
		expect(isEventNamePatternValid('111..abc')).toBe(false)
	})

})
