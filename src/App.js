import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Registration } from './components/Registration';
import { Authorization } from './components/Authorization';
import { Main } from './components/Main';


function App() {
	const [authorized, setAuthorized] = useState(false);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={'/auth'} element={<Authorization setAuthorized={setAuthorized} />} />
					<Route path={'/reg'} element={<Registration />} />
					<Route path={'/'} element={authorized
						? <Main setAuthorized={setAuthorized} />
						: <Navigate to={'/auth'}/>}
					/>
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;


