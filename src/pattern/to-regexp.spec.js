import patternToRegExp from './to-regexp'

describe('Template string to RegExp', () => {

	it ('should return regular expression of an empty string', () => {
		const regExp = patternToRegExp()

		expect(regExp.toString()).toEqual('/^$/')
	})

	it ('should return regular expression of an empty string', () => {
		const regExp = patternToRegExp('')

		expect(regExp.toString()).toEqual('/^$/')
	})

	it ('should throw an error for non-string input', () => {
		expect(
			() => patternToRegExp([ 1, 2, 3 ])
		).toThrow('Pattern must be a string')
	})

	it ('should return regular expression of a single character', () => {
		const regExp = patternToRegExp('a')

		expect(regExp.toString()).toEqual('/^a$/')
	})

	it ('should return regular expression of a single delimiter', () => {
		const regExp = patternToRegExp('.')

		expect(regExp.toString()).toEqual('/^\\.$/')
	})

	it ('should return regular expression of a string', () => {
		const regExp = patternToRegExp('a2c')

		expect(regExp.toString()).toEqual('/^a2c$/')
	})

	it ('should return regular expression of a string containing delimiter', () => {
		const regExp = patternToRegExp('foo.123')

		expect(regExp.toString()).toEqual('/^foo\\.123$/')
	})

	it ('should return regular expression of a string containing multiple delimiters', () => {
		const regExp = patternToRegExp('foo.bla.bar')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.bar$/')
	})

	it ('should return regular expression of a string ending with a delimiter', () => {
		const regExp = patternToRegExp('foo.bla.')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.$/')
	})

	it ('should return regular expression of a string strting with a delimiter', () => {
		const regExp = patternToRegExp('.bla.bar')

		expect(regExp.toString()).toEqual('/^\\.bla\\.bar$/')
	})

	it ('should return regular expression of a string starting and ending with a delimiter', () => {
		const regExp = patternToRegExp('.bla.bar.')

		expect(regExp.toString()).toEqual('/^\\.bla\\.bar\\.$/')
	})

	it ('should return regular expression of a string containing multiple delimiters in a row', () => {
		const regExp = patternToRegExp('foo.bla..bar')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.\\.bar$/')
	})

	it ('should return regular expression of a single wildcard', () => {
		const regExp = patternToRegExp('*')

		expect(regExp.toString()).toEqual('/^[^.]+$/')
	})

	it ('should return regular expression of a string containing wildcard', () => {
		const regExp = patternToRegExp('foo.*.bar')

		expect(regExp.toString()).toEqual('/^foo\\.[^.]+\\.bar$/')
	})

	it ('should return regular expression of a string starting with a wildcard', () => {
		const regExp = patternToRegExp('*.bla.bar')

		expect(regExp.toString()).toEqual('/^[^.]+\\.bla\\.bar$/')
	})

	it ('should throw an error for a string starting with a wildcard', () => {
		expect(
			() => patternToRegExp('*bla.bar')
		).toThrow('Invalid pattern')
	})

	it ('should return regular expression of a string ending with a wildcard', () => {
		const regExp = patternToRegExp('foo.bla.*')

		expect(regExp.toString()).toEqual('/^foo\\.bla\\.[^.]+$/')
	})

	it ('should return regular expression of a double wildcard', () => {
		const regExp = patternToRegExp('**')

		expect(regExp.toString()).toEqual('/^[^$]+$/')
	})

	it ('should return regular expression of a string ending with a double wildcard', () => {
		const regExp = patternToRegExp('foo.**')

		expect(regExp.toString()).toEqual('/^foo\\.[^$]+$/')
	})

	it ('should throw an error for a string starting with a double wildcard', () => {
		expect(
			() => patternToRegExp('**.foo')
		).toThrow('Invalid pattern')
	})

	it ('should throw an error for a string with a double wildcard inside', () => {
		expect(
			() => patternToRegExp('foo.**.bar')
		).toThrow('Invalid pattern')
	})

	it ('should throw an error for a string with a double wildcard inside', () => {
		expect(
			() => patternToRegExp('foo**')
		).toThrow('Invalid pattern')
	})

})
