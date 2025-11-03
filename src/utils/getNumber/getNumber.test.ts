import { getNumber } from './getNumber';

describe('getNumber', () => {
	test.each([
		[1, NaN, 1],
		[1, undefined, 1],
		[undefined, NaN, 0],
		[undefined, undefined, 0],
		[NaN, 1, 1],
		[1, Infinity, 1],
		[Infinity, 22, 22],
		[undefined, 22, 22],
		[5, Infinity, 5],
		[1.2, 3, 1.2],
		[NaN, NaN, 0],
		[undefined, Infinity, 0],
		['letter', Infinity, 0],
		['5', NaN, 5],
		['5.5', Infinity, 5.5],
		['5,5', NaN, 5.5],
		['', NaN, 0],
		[null, 5, 5],
		['', 5, 5],
		[{}, undefined, 0],
		[[], Infinity, 0],
		[-5, 1, -5],
		[-0.1, 1, -0.1],
	])(
		'potentiallyUndefinedNumber %s and defaultValue %s should return %s',
		(anyValue: unknown, defaultValue: number | undefined, expected: number) => {
			expect(getNumber(anyValue, defaultValue)).toStrictEqual(expected);
		},
	);
});
