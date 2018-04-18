import React from 'react';

import Lives from './Lives/Lives';

const Header = (props) => {
    const {remainingLives, answerIsCorrect} = props;
    return (
        <div>
            {answerIsCorrect === false &&
            <div className="alert alert-warning" role="alert">
                {remainingLives === 0 ? 'Game over dude!' : 'Ooops! Not the right answer. Try a new game.'}
            </div>
            }
            {answerIsCorrect === true &&
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>Aww yeah, you successfully won the game!</p>
                <hr/>
                <p className="mb-0">Click on the "Redo" button and play it again :)</p>
            </div>
            }

            <Lives remainingLives={props.remainingLives}/>
        </div>
    );
};

export default Header;