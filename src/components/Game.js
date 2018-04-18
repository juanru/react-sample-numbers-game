import React from 'react';

import Header from './Header/Header';
import Body from './Body/Body';
import Choices from './Choices/Choices';

const Game = (props) => {
    return (
        <div className="container">
            <Header remainingLives={props.remainingLives} answerIsCorrect={props.answerIsCorrect}/>
            <Body {...props}/>
            <Choices handleSelectedNumber={props.handleSelectedNumber} selectedNumbers={props.selectedNumbers}
                     answerIsCorrect={props.answerIsCorrect}/>
        </div>
    );
};

export default Game;