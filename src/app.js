import React from 'react';
import { hot } from 'react-hot-loader/root';
import './app.css';
import './app.scss';
function App() {
	return (
		<div>
			<div className="test_class">hello world ~</div>
			<div className="scss_class">scss_class ~</div>
		</div>
	);
}
export default hot(App);
