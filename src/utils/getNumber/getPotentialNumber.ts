export const getPotentialNumber = <TReturn>(
	potentialNumberValue: unknown,
	defaultValue: TReturn,
) => {
	// Number('') => 0
	return potentialNumberValue !== '' &&
		// Number(null) => 0
		potentialNumberValue !== null &&
		isFinite(Number(potentialNumberValue))
		? Number(potentialNumberValue)
		: defaultValue;
};
