import React from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import registerServiceWorker from './registerServiceWorker';

// Components
import Routes from './Routes';

// Styles
import './index.css';

ReactDOM.render(
    <Routes />,
    document.getElementById('root')
);
registerServiceWorker();