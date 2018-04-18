import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const RetryButton = (props) => {
    return (
        <button
            className={'btn btn-lg btn-warning'} style={{marginTop: '5px'}} onClick={props.resetGame}>
            <FontAwesomeIcon icon="redo"/>
        </button>
    );
};

export default RetryButton;