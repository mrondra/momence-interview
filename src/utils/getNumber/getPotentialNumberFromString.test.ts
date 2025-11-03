import { getPotentialNumberFromString } from './getPotentialNumberFromString';

describe('getPotentialNumberFromString', () => {
	test.each([
		['letter', 'other letter', 'other letter'],
		['5', undefined, 5],
		['5.5', Infinity, 5.5],
		['5,5', NaN, 5.5],
		['5,5', 0, 5.5],
		['5.5', 1000, 5.5],
		['', null, null],
	])(
		'potentialNumberValue %s and defaultValue %s should return %s',
		(anyValue: string, defaultValue: unknown, expected: unknown) => {
			expect(
				getPotentialNumberFromString(anyValue, defaultValue),
			).toStrictEqual(expected);
		},
	);
});
