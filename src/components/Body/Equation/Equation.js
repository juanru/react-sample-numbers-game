import React from 'react';
import _ from "lodash";

import {NUMBERS_COUNT} from '../../../util/constants/gameConstants';

const Equation = (props) => {
    const {selectedNumbers, operations} = props;

    const printEquation = (selectedNumbers) => {
        let indents = [];
        // Fill in with empty values if no numbers has been selected yet
        if (selectedNumbers.length !== NUMBERS_COUNT)
            selectedNumbers = selectedNumbers.concat(Array.from("?".repeat(NUMBERS_COUNT - selectedNumbers.length)));

        _.forEach(operations, function (operation, i) {
            indents.push(<span key={i}>
                <span key={i} className={'numberCircle equation'}><h4>{selectedNumbers[i]}</h4></span>
                <span key={i + selectedNumbers.length}
                      className={'operationCircle equation'}><h4>{operation}</h4></span>
            </span>);
            if (operation.length === i - 1)
                indents.push(<span key={i + 1}
                                   className={'numberCircle equation'}><h4>{selectedNumbers[i + 1]}</h4></span>);
        });
        return indents
    };

    return (
        <div>
            {printEquation(selectedNumbers)}
        </div>
    );
};

export default Equation;