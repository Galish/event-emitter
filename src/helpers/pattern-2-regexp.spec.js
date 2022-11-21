import pattern2RegExp from './pattern-2-regexp'

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
