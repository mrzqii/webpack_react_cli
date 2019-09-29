import React from 'react';
import { hot } from 'react-hot-loader/root';
import './app.css';
import './app.scss';
import style from './app.module.scss';
function App() {
	return (
		<div>
			<div className="css_class">hello world ~</div>
			<div className="scss_class">scss_class ~</div>
			<div className={style.scss_module}>scss_class ~</div>
		</div>
	);
}
export default hot(App);
