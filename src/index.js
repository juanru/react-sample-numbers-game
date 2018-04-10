import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

fontawesome.library.add(faTimes, faCheck);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
