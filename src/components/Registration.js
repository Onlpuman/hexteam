import { useState, useRef } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(undefined);
	const [regSuccess, setRegSuccess] = useState(false);

	const inputLogin = useRef();
	const inputPass = useRef();

	const handleSubmit = (event) => {
		event.preventDefault();
		setError(undefined);

		const form = event.currentTarget;
		const isValid = form.checkValidity();

		if (!isValid) {
			setValidated(true);
			return;
		}

		const username = inputLogin.current.value;
		const password = inputPass.current.value;

		axios
			.post(`http://79.143.31.216/register?username=${username}&password=${password}`)
			.then(function () {
				setRegSuccess(true);
			})
			.catch(function (error) {
				setError(error?.response?.data?.detail || 'Unknown error');
			});
	};

	return (
		<>
			<h1>Register</h1>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className="mb-3">
					<Form.Group className="mb-3" as={Col} md="12" controlId="registrationCustom">
						<Form.Label>Login</Form.Label>
						<Form.Control
							required
							type="text"
							ref={inputLogin}
						/>
						<Form.Control.Feedback type="invalid">Please enter login!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" as={Col} md="12" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							ref={inputPass}
						/>
						<Form.Control.Feedback type="invalid">Please enter password!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Button type="submit">Send</Button>
			</Form>
			<Link className="mb-3" to="/">Already registered?</Link>
			{error && (
				<Alert variant={'danger'}>
					{error}
				</Alert>
			)}
			{regSuccess && (
				<Alert variant={'success'}>
					Regitration successful, you can <Link to="/hexteam">authorize now</Link>.
				</Alert>
			)}
		</>
	);
};