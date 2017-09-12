import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WalmartApi from "./services/WalmartApi";

let walmartApi = new WalmartApi();

ReactDOM.render(<App walmartApi={walmartApi} />, document.getElementById('root'));
registerServiceWorker();
