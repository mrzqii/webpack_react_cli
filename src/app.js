import React from 'react';
import { hot } from 'react-hot-loader/root';
import './app.css';
import './app.scss';
import './style/global.sass';
import style from './app.module.scss';
import img1 from './assets/small.png';
import img2 from './assets/bigger.jpg';
function App() {
	return (
		<div>
			<div className="css_class">hello world ~</div>
			<div className="scss_class">scss_class ~</div>
			<div className={style.scss_module}>scss_class ~</div>
			<div>
				<img src={img1} alt="" />
				<img width="100px" src={img2} alt="" />
			</div>
			{/* <div>
				<img src="./assets/loading.png" alt="" />
				<img width="100px" src="./assets/timg.jpg" alt="" />
			</div> */}
			<div>
				<i className="iconfont iconhandoup" style={{ color: 'red', fontSize: '16px' }} />
			</div>
		</div>
	);
}
export default hot(App);
