import React from 'react';

import CheckButton from './Buttons/CheckButton';
import RetryButton from './Buttons/RetryButton';
import Equation from './Equation/Equation';

const Body = (props) => {
    const {
        goalNumber, answerIsCorrect, checkOperation, operations, selectedNumbers, remainingLives, resetGame
    } = props;

    return (
        <div className="row justify-content-center">
            <div className="col-4 column goalColumn">
                <div className="row justify-content-center">Goal number:</div>
                <h1 style={{textAlign: 'center'}}>{goalNumber}</h1>
            </div>
            <div className="col-2 align-middle">
                <div className="column vcenter hcenter">
                    <CheckButton answerIsCorrect={answerIsCorrect} selectedNumbers={selectedNumbers}
                                 checkOperation={checkOperation}/>
                    {remainingLives > 0 && answerIsCorrect !== null &&
                    <RetryButton resetGame={resetGame}/>
                    }
                </div>

            </div>
            <div className="col-4 column playgroundColumn">
                <div className="row justify-content-center">Math Puzzle:</div>
                <div style={{textAlign: 'center'}}>
                    <Equation selectedNumbers={selectedNumbers} operations={operations}/>
                </div>
            </div>
        </div>
    );
};

export default Body;