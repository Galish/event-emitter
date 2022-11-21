import { isEventNamePatternValid, matchesPattern, pattern2RegExp } from './helpers'

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

describe('Template string to RegExp', () => {

	it ('should return regular expression of an empty string', () => {
		const regExp = pattern2RegExp()

		expect(regExp.toString()).toEqual('/^$/')
	})

	it ('should return regular expression of an empty string', () => {
		const regExp = pattern2RegExp('')

		expect(regExp.toString()).toEqual('/^$/')
	})

	it ('should throw an error for non-string input', () => {
		expect(
			() => pattern2RegExp([ 1, 2, 3 ])
		).toThrow('Pattern must be a string')
	})

	it ('should return regular expression of a single character', () => {
		const regExp = pattern2RegExp('a')

		expect(regExp.toString()).toEqual('/^a$/')
	})

	it ('should return regular expression of a single delimiter', () => {
		const regExp = pattern2RegExp('.')

		expect(regExp.toString()).toEqual('/^\\.$/')
	})

	it ('should return regular expression of a string', () => {
		const regExp = pattern2RegExp('a2c')

		expect(regExp.toString()).toEqual('/^a2c$/')
	})

	it ('should return regular expression of a string containing delimiter', () => {
		const regExp = pattern2RegExp('foo.123')

		expect(regExp.toString()).toEqual('/^foo\\.123$/')
	})

	it ('should return regular expression of a string containing multiple delimiters', () => {
		const regExp = pattern2RegExp('foo.bla.bar')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.bar$/')
	})

	it ('should return regular expression of a string ending with a delimiter', () => {
		const regExp = pattern2RegExp('foo.bla.')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.$/')
	})

	it ('should return regular expression of a string strting with a delimiter', () => {
		const regExp = pattern2RegExp('.bla.bar')

		expect(regExp.toString()).toEqual('/^\\.bla\\.bar$/')
	})

	it ('should return regular expression of a string starting and ending with a delimiter', () => {
		const regExp = pattern2RegExp('.bla.bar.')

		expect(regExp.toString()).toEqual('/^\\.bla\\.bar\\.$/')
	})

	it ('should return regular expression of a string containing multiple delimiters in a row', () => {
		const regExp = pattern2RegExp('foo.bla..bar')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.\\.bar$/')
	})

	it ('should return regular expression of a single wildcard', () => {
		const regExp = pattern2RegExp('*')

		expect(regExp.toString()).toEqual('/^[^.]+$/')
	})

	it ('should return regular expression of a string containing wildcard', () => {
		const regExp = pattern2RegExp('foo.*.bar')

		expect(regExp.toString()).toEqual('/^foo\\.[^.]+\\.bar$/')
	})

	it ('should return regular expression of a string starting with a wildcard', () => {
		const regExp = pattern2RegExp('*.bla.bar')

		expect(regExp.toString()).toEqual('/^[^.]+\\.bla\\.bar$/')
	})

	it ('should throw an error for a string starting with a wildcard', () => {
		expect(
			() => pattern2RegExp('*bla.bar')
		).toThrow('Invalid pattern')
	})

	it ('should return regular expression of a string ending with a wildcard', () => {
		const regExp = pattern2RegExp('foo.bla.*')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.[^.]+$/')
	})

	it ('should return regular expression of a double wildcard', () => {
		const regExp = pattern2RegExp('**')

		expect(regExp.toString()).toEqual('/^[^$]+$/')
	})

	it ('should return regular expression of a string ending with a double wildcard', () => {
		const regExp = pattern2RegExp('foo.**')

		expect(regExp.toString()).toEqual('/^foo\\.[^$]+$/')
	})

	it ('should throw an error for a string starting with a double wildcard', () => {
		expect(
			() => pattern2RegExp('**.foo')
		).toThrow('Invalid pattern')
	})

	it ('should throw an error for a string with a double wildcard inside', () => {
		expect(
			() => pattern2RegExp('foo.**.bar')
		).toThrow('Invalid pattern')
	})

	it ('should throw an error for a string with a double wildcard inside', () => {
		expect(
			() => pattern2RegExp('foo**')
		).toThrow('Invalid pattern')
	})

})

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
