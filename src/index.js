import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import SearchApi from "./services/SearchApi";

let searchApi = new SearchApi();

ReactDOM.render(<App searchApi={searchApi} />, document.getElementById('root'));
registerServiceWorker();
