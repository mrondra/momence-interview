import { getPotentialNumber } from './getPotentialNumber';

describe('getPotentialNumber', () => {
	test.each([
		[1, undefined, 1],
		[undefined, undefined, undefined],
		[NaN, 1, 1],
		[1, null, 1],
		[Infinity, 22, 22],
		[5, Infinity, 5],
		[1.2, 3, 1.2],
		[NaN, NaN, NaN],
		[undefined, null, null],
		['letter', 'other letter', 'other letter'],
		['5', undefined, 5],
		['5.5', Infinity, 5.5],
		['5,5', NaN, NaN],
		['', 5, 5],
		['', null, null],
		[null, '', ''],
	])(
		'potentialNumberValue %s and defaultValue %s should return %s',
		(
			potentialNumberValue: unknown,
			defaultValue: unknown,
			expected: unknown,
		) => {
			expect(
				getPotentialNumber(potentialNumberValue, defaultValue),
			).toStrictEqual(expected);
		},
	);
});
