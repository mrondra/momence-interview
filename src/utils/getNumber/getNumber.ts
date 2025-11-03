import _isFinite from 'lodash/isFinite';
import _isString from 'lodash/isString';

import { getPotentialNumber } from './getPotentialNumber';
import { getPotentialNumberFromString } from './getPotentialNumberFromString';

/**
 * 		[anyValue, optionalDefaultValue, result]
 * 		[1, undefined, 1],
 * 		[undefined, undefined, 0],
 * 		[NaN, 1, 1],
 * 		[1, null, 1],
 * 		[Infinity, 22, 22],
 * 		[5, Infinity, 5],
 * 		[1.2, 3, 1.2],
 * 		[NaN, NaN, 0],
 * 		[undefined, null, 0],
 * 		['letter', 'other letter', 0],
 * 		['5', undefined, 5],
 * 		['5.5', Infinity, 5.5],
 * 		['5,5', NaN, 5.5],
 */
export const getNumber = (
	potentiallyUndefinedNumber: unknown,
	defaultValue: number = 0,
): number => {
	// null can overwrite defaultValue = 0 -> check bellow
	const defaultValueNumber = _isFinite(defaultValue) ? defaultValue : 0;
	const isValueAString = _isString(potentiallyUndefinedNumber);

	if (isValueAString) {
		return getPotentialNumberFromString<number>(
			potentiallyUndefinedNumber,
			defaultValueNumber,
		);
	}
	return getPotentialNumber<number>(
		potentiallyUndefinedNumber,
		defaultValueNumber,
	);
};
