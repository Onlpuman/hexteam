/*
	'short', 'target'
 */

 export const sortByTextField = ({
	data,
	sort,
	sortField,
}) => {
	let sorted = [...data];

	if (sort === '' || sort === 'decrease') {
		sorted = sorted.sort((a, b) => {
			if (a[sortField] > b[sortField]) return 1;
			if (a[sortField] === b[sortField]) return 0;
			if (a[sortField] < b[sortField]) return -1;
		});
	} else {
		sorted = sorted.sort((a, b) => {
			if (a[sortField] > b[sortField]) return -1;
			if (a[sortField] === b[sortField]) return 0;
			if (a[sortField] < b[sortField]) return 1;
		});
	}
	return sorted;
};