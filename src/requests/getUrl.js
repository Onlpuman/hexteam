export const getUrl = ({
	offset,
	limit,
	sort,
}) => {
	let baseLink = `http://79.143.31.216/statistics?offset=${offset}&limit=${limit}`;
	if (sort) {
		baseLink = `http://79.143.31.216/statistics?order=${sort}&offset=${offset}&limit=${limit}`;
	}
	return baseLink;
};