import { Button } from 'react-bootstrap';
import axios from 'axios';

export const ModalButtons = props => {
	const { statistics, currentInput, recurringLink, squeezed, setSqueezed, setRecurringLink, setCurrentInput } = props;

	const handleLinkCreate = event => {
		event.preventDefault();
		const hasSameLink = Boolean(statistics.find(({ target }) => target === currentInput));

		if (hasSameLink) {
			setRecurringLink(true);
			return null;
		}

		axios
			.post(`http://79.143.31.216/squeeze?link=${currentInput}`)
			.then(response => {
				const { short } = response.data;
				setSqueezed(short);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleTryAgain = () => {
		setRecurringLink(false);
		setCurrentInput('');
	};

	const handleDone = () => {
		setSqueezed(false);
		setCurrentInput('');
	};

	if (recurringLink) {
		return (
			<Button className="mb-3" variant="success" onClick={handleTryAgain}>
				Try Again!
			</Button>
		);
	}

	if (squeezed) {
		return (
			<Button className="mb-3" variant="success" onClick={handleDone}>
				Done!
			</Button>
		);
	}

	if (!squeezed) {
		return (
			<Button className="mb-3" variant="primary" onClick={handleLinkCreate}>
				Squeeze!
			</Button>
		);
	}
};