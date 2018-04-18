import React from 'react';
import _ from "lodash";

import {NUMBERS_COUNT, MAX_SELECTED_NUMBER} from '../../util/constants/gameConstants'

const Choice = (props) => {
    const {index, handleSelectedNumber, selectedNumbers, answerIsCorrect} = props;

    let notCheckedYet = answerIsCorrect === null;
    let numberIsSelected = selectedNumbers.includes(index + 1);
    let maxNumbersReached = selectedNumbers.length === NUMBERS_COUNT;

    // If operation has been checked, the numbers are frozen
    // Before checking the operation, the player can select numbers until the MAX_NUMBER is reached
    //      Selected numbers can be unselected
    let canClick = notCheckedYet && (!maxNumbersReached || numberIsSelected);

    let choice = null;

    if (canClick) {
        choice = <div key={index} onClick={() => handleSelectedNumber(index + 1)}
                      className={`numberCircle ${numberIsSelected ? 'selected' : ''}`}>{index + 1}</div>;
    } else {
        choice = <div key={index} className={`numberCircle disabled ${numberIsSelected ? 'selected' : ''}`}>{index + 1}</div>;
    }

    return (
        choice
    )
};

const Choices = (props) => {
    return (
        <div className={'choices'}>
            {_.times(MAX_SELECTED_NUMBER, function (i) {
                return <Choice key={i} index={i} {...props}/>
            })}
        </div>
    );
};

export default Choices;