import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { sortByTextField } from '../lib/sortByTextField';
import { sortByDigit } from '../lib/sortByDigit';
import { copyToClipboard } from '../lib/copyToClipboard';

import { Paginator } from './Paginator';
import { ModalButtons } from './ModalButtons';


export const Main = props => {
	const { setAuthorized } = props;
	const [error, setError] = useState(undefined);
	const [statistics, setStatistics] = useState([]);
	const [currentStatistics, setCurrentStatistics] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [squeezed, setSqueezed] = useState(false);
	const [currentInput, setCurrentInput] = useState('');
	const [recurringLink, setRecurringLink] = useState(false);
	const [offset, setOffset] = useState(0);
	const [sort, setSort] = useState('');
	const limit = 10;


	useEffect(() => {
		axios
			.get('http://79.143.31.216/statistics')
			.then(response => setStatistics(response.data))
			.catch(error => setError(error?.response?.data?.detail || 'Unknown error'));
	}, [squeezed]);

	useEffect(() => {
		axios
			.get(`http://79.143.31.216/statistics?offset=${offset}&limit=${limit}`)
			.then(response => setCurrentStatistics(response.data))
			.catch(error => setError(error?.response?.data?.detail || 'Unknown error'));
	}, [offset, squeezed]);

	const handleLogout = () => {
		setAuthorized(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setSqueezed(false);
		setRecurringLink(false);
		setCurrentInput('');
	};

	const handleSortByShortName = () => {
		const sortedData = sortByTextField({
			data: currentStatistics,
			sort,
			sortField: 'short',
		});
		if (sort === '' || sort === 'decrease') {
			setSort('increase');
		} else {
			setSort('decrease');
		}
		setCurrentStatistics(sortedData);
	};

	const handleSortByName = () => {
		const sortedData = sortByTextField({
			data: currentStatistics,
			sort,
			sortField: 'target',
		});
		if (sort === '' || sort === 'decrease') {
			setSort('increase');
		} else {
			setSort('decrease');
		}
		setCurrentStatistics(sortedData);
	};

	const handleSortByDigit = () => {
		const sortedData = sortByDigit({
			data: currentStatistics,
			sort,
		});
		if (sort === '' || sort === 'decrease') {
			setSort('increase');
		} else {
			setSort('decrease');
		}
		setCurrentStatistics(sortedData);
	};

	const handleCopyLink = (e) => {
		const text = e.target.dataset.link;
		copyToClipboard(text);
	};

	return (
		error
			? (
				<Alert variant={'danger'}>
					{error}
				</Alert>
			)
			: (
				<>
					<Paginator
						statistics={statistics}
						offset={offset}
						setOffset={setOffset}
					/>
					<div className="buttons-container">
						<Button onClick={handleModalOpen}>Squeeze link</Button>
						<Button onClick={handleLogout}>Exit</Button>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>№</th>
								<th onClick={handleSortByShortName}>Short link</th>
								<th onClick={handleSortByName}>Original link</th>
								<th onClick={handleSortByDigit}>Count of click</th>
							</tr>
						</thead>
						<tbody>
							{
								currentStatistics.map((el, i) => {
									return (
										<tr key={el.id}>
											<td>{offset + i + 1}</td>
											<td
												onClick={handleCopyLink}
												data-link={`http://79.143.31.216/s/${el.short}`}
											>
												{`http://79.143.31.216/s/${el.short}`}
											</td>
											<td>{el.target}</td>
											<td>{el.counter}</td>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
					{(
						<Modal show={modalOpen} onHide={handleModalClose}>
							<Modal.Header closeButton>
								<Modal.Title>Create link</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group className="mb-3">
										<Form.Control
											type="text"
											placeholder={'Enter link to squeeze'}
											value={squeezed ? `http://79.143.31.216/s/${squeezed}` : currentInput}
											readOnly={recurringLink || squeezed}
											onChange={(e) => setCurrentInput(e.target.value)}
										/>
									</Form.Group>
									<ModalButtons
										statistics={statistics}
										currentInput={currentInput}
										recurringLink={recurringLink}
										squeezed={squeezed}
										setSqueezed={setSqueezed}
										setRecurringLink={setRecurringLink}
										setCurrentInput={setCurrentInput}
									/>
									{recurringLink &&
										<Alert variant={'danger'}>
											Address already exists! Click on the "Try Again!" button.
										</Alert>
									}
								</Form>
							</Modal.Body>
						</Modal>
					)}
					<span>*Click on the column name to sort</span>
					<span>*Click on the short link to copy it</span>
				</>
			)
	);
};