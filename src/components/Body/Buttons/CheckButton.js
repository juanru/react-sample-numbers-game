import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import {NUMBERS_COUNT} from '../../../util/constants/gameConstants';

const CheckButton = (props) => {
    const {answerIsCorrect, checkOperation, selectedNumbers} = props;
    let button;
    if (answerIsCorrect) {
        button =
            <button
                className={'btn btn-lg btn-success'} disabled={true}>
                <FontAwesomeIcon icon="check"/>
            </button>
    } else if (answerIsCorrect == null) {
        button =
            <button onClick={checkOperation}
                    className={'btn btn-lg'} disabled={selectedNumbers.length !== NUMBERS_COUNT}> =
            </button>
    } else {
        button =
            <button
                className={'btn btn-lg btn-danger'} disabled={true}>
                <FontAwesomeIcon icon="times"/>
            </button>
    }
    return (
        button
    );
};

export default CheckButton;