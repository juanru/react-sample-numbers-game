import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome'
import { faTimes, faCheck, faRedo, faHeart } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faTimes, faCheck, faRedo, faHeart);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
