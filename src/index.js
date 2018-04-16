import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faRedo from '@fortawesome/fontawesome-free-solid/faRedo';

fontawesome.library.add(faTimes, faCheck, faRedo);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
