import { getPotentialNumber } from './getPotentialNumber';

export const getPotentialNumberFromString = <TResult>(
	potentialNumberInString: string,
	defaultValue: TResult,
) => {
	// let's try to convert string to a number that Number() understands as number
	// Number("5.5") => 5.5
	// Number("5,5") => NaN
	const matchingNumberString = potentialNumberInString.replace(',', '.');
	// and then evaluate
	return getPotentialNumber<TResult>(matchingNumberString, defaultValue);
};
