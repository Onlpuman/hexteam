import { useState, useRef } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

export const Authorization = props => {
	const { setAuthorized } = props;
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(undefined);
	const navigate = useNavigate();

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
			.post('http://79.143.31.216/login', qs.stringify({
				username,
				password,
			}))
			.then(function (response) {
				const { access_token, token_type } = response.data;
				axios.defaults.headers.common = { 'Authorization': `${token_type} ${access_token}` };
				setAuthorized(true);
				navigate('/');
			})
			.catch(function (error) {
				console.log(error);
				setError(error.response.data.detail || 'Unknown error');
			});
	};

	return (
		<>
			<h1 className="h1">Authorization</h1>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className="mb-3">
					<Form.Group className="mb-3" as={Col} md="12" controlId="registrationCustom">
						<Form.Label>Login</Form.Label>
						<Form.Control
							required
							type="text"
							ref={inputLogin}
						/>
						<Form.Control.Feedback type="invalid">Please enter your name!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" as={Col} md="12" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							ref={inputPass}
						/>
						<Form.Control.Feedback type="invalid">Please enter your password!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Button type="submit">Submit</Button>
			</Form>
			<Link to="/reg">Not registered?</Link>
			{error && (
				<Alert variant={'danger'}>
					{error}
				</Alert>
			)}
		</>
	);
};