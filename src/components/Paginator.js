import Pagination from 'react-bootstrap/Pagination';
import {  useState, useRef } from 'react';

export const Paginator = (props) => {
	const { statistics, offset, setOffset } = props;
	const [currentPage, setCurrentPage] = useState(1);
	const pagesTotal = useRef();
	const defaultLimit = 10;
	pagesTotal.current = Math.ceil(statistics.length / defaultLimit);
	const maxPagesShown = pagesTotal.current;

	const handleFirst = () => {
		setOffset(0);
		setCurrentPage(1);
	};

	const handlelPrev = () => {
		if (!offset) {
			return;
		} else {
			setCurrentPage(currentPage - 1);
			setOffset(offset - defaultLimit);
		}
	};

	const handleNext = () => {
		if (offset >= maxPagesShown * defaultLimit) {
			return;
		} else {
			setCurrentPage(currentPage + 1);
			setOffset(offset + defaultLimit);
		}
	};

	const handleLast = () => {
		setOffset(defaultLimit * maxPagesShown - defaultLimit);
		setCurrentPage(pagesTotal.current);
	};

	return (
		<Pagination>
			<Pagination.First onClick={handleFirst} disabled={currentPage === 1}/>
			<Pagination.Prev onClick={handlelPrev} disabled={currentPage === 1}/>
			{pagesTotal.current >= maxPagesShown
				&& currentPage > 3 && (
					<Pagination.Ellipsis disabled />
				)}
			{
				[...Array(pagesTotal.current > maxPagesShown ? maxPagesShown : pagesTotal.current)].map((_, i) => {
					let pageNumber = i + 1;

					if (pagesTotal.current > maxPagesShown) {
						if (currentPage > 3 && currentPage <= (pagesTotal.current - 3)) {
							pageNumber += currentPage - 3;
						} else if (currentPage > (pagesTotal.current - 3)) {
							pageNumber += (pagesTotal.current - maxPagesShown);
						}
					}

					const handleItem = () => {
						setOffset(defaultLimit * pageNumber - defaultLimit);
						setCurrentPage(pageNumber);
					};

					return (
						<Pagination.Item
							key={pageNumber}
							onClick={handleItem}
							active={pageNumber === currentPage}
						>
							{pageNumber}
						</Pagination.Item>
					);
				})
			}
			{pagesTotal.current >= maxPagesShown && currentPage <= (pagesTotal.current - 3) && (
				<Pagination.Ellipsis disabled />
			)}
			<Pagination.Next onClick={handleNext} disabled={currentPage === pagesTotal.current}/>
			<Pagination.Last onClick={handleLast} disabled={currentPage === pagesTotal.current}/>
		</Pagination>
	);
};

