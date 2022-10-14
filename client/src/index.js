import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context/context';


import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import './index.css';

ReactDOM.render(
	<SpeechProvider appId="91ba79e0-a4fc-45b6-adf2-bfd167d1f69e" language="en-US">
		<Provider>
            <App />
		</Provider>
	</SpeechProvider>,
	document.getElementById('root')
);
