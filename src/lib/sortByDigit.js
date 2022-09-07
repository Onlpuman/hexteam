/*
	'short', 'target'
 */

export const sortByDigit = ({
	data,
	sort,
}) => {

	let sorted = [...data];

	if (sort === '' || sort === 'decrease') {
		sorted = sorted.sort((a, b) => a.counter - b.counter);
	} else {
		sorted = sorted.sort((a, b) => b.counter - a.counter);
	}
	return sorted;
};
