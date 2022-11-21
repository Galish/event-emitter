import matchesPattern from './matches-pattern'

describe('String matching pattern', () => {

	it('should return `true` with no arguments', () => {
		expect(matchesPattern()).toBeTruthy()
	})

	it('should return `true` for empty strings', () => {
		expect(matchesPattern('', '')).toBeTruthy()
	})

	it('should return `true` for identical strings', () => {
		expect(matchesPattern('abc', 'abc')).toBeTruthy()
	})

	it('should return `false` for different strings', () => {
		expect(matchesPattern('abc', 'abcd')).toBeFalsy()
	})

	it('should return `true` for identical strings containing delimiter', () => {
		expect(matchesPattern('abc.de', 'abc.de')).toBeTruthy()
	})

	it('should return `false` for different strings containing delimiter', () => {
		expect(matchesPattern('abc.de', 'abc.def')).toBeFalsy()
	})

	it('should return `true` for a wildcard pattern and letter', () => {
		expect(matchesPattern('*', 'a')).toBeTruthy()
	})

	it('should return `true` for a wildcard pattern and string', () => {
		expect(matchesPattern('*', 'abc')).toBeTruthy()
	})

	it('should return `true` for a wildcard pattern and number', () => {
		expect(matchesPattern('*', 123)).toBeTruthy()
	})

	it('should return `false` for a wildcard pattern and string containing delimiter', () => {
		expect(matchesPattern('*', 'abc.de')).toBeFalsy()
	})

	// it('should return `true` for a pattern containing wildcard and string', () => {
	// 	expect(matchesPattern('abc*', 'abc')).toBeTruthy()
	// })
	//
	// it('#10 should return `true`', () => {
	// 	expect(matchesPattern('ab*', 'abc')).toBeTruthy()
	// })

	it('should return `true` for a pattern ending with wildcard and string containing delimiter', () => {
		expect(matchesPattern('abc.*', 'abc.de')).toBeTruthy()
	})

	it('should return `false` for a pattern ending with wildcard and string ending with delimiter', () => {
		expect(matchesPattern('abc.*', 'abc.')).toBeFalsy()
	})

	it('should return `true` for a pattern ending with wildcard and string containing delimiter', () => {
		expect(matchesPattern('abc.def.*', 'abc.def.g')).toBeTruthy()
	})

	it('should return `false` for a pattern ending with wildcard and string ending with delimiter', () => {
		expect(matchesPattern('abc.def.*', 'abc.def.')).toBeFalsy()
	})

	it('should return `false` for a pattern ending with wildcard and string containing delimiters', () => {
		expect(matchesPattern('abc.*', 'abc.de.fg')).toBeFalsy()
	})

	it('should return `true` for a pattern containing wildcard and string containing delimiters', () => {
		expect(matchesPattern('abc.*.fg', 'abc.de.fg')).toBeTruthy()
	})

	it('should return `false` for a pattern containing wildcard and string containing delimiter', () => {
		expect(matchesPattern('abc.*.fg', 'abc.fg')).toBeFalsy()
	})

	it('should return `false` for a pattern containing wildcard and string containing multiple delimiter in a row', () => {
		expect(matchesPattern('abc.*.fg', 'abc..fg')).toBeFalsy()
	})

	it('should return `true` for a double wildcard pattern and letter', () => {
		expect(matchesPattern('**', 'a')).toBeTruthy()
	})

	it('should return `true` for a double wildcard pattern and string', () => {
		expect(matchesPattern('**', 'abc')).toBeTruthy()
	})

	it('should return `true` for a double wildcard pattern and number', () => {
		expect(matchesPattern('**', 123)).toBeTruthy()
	})

	it('should return `true` for a double wildcard pattern and string containing delimiter', () => {
		expect(matchesPattern('**', 'abc.de')).toBeTruthy()
	})

	it('should return `true` for a pattern ending with double wildcard and string containing delimiter', () => {
		expect(matchesPattern('abc.**', 'abc.de')).toBeTruthy()
	})

	it('should return `false` for a pattern ending with double wildcard and string ending with delimiter', () => {
		expect(matchesPattern('abc.**', 'abc.')).toBeFalsy()
	})

	it('should return `true` for a pattern ending with double wildcard and string containing delimiter', () => {
		expect(matchesPattern('abc.def.**', 'abc.def.g')).toBeTruthy()
	})

	it('should return `false` for a pattern ending with double wildcard and string ending with delimiter', () => {
		expect(matchesPattern('abc.def.**', 'abc.def.')).toBeFalsy()
	})

	it('should return `true` for a pattern ending with double wildcard and string containing delimiters', () => {
		expect(matchesPattern('abc.**', 'abc.de.fg')).toBeTruthy()
	})

})
