import React, {Component} from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'

import {NUMBER_LIVES, NUMBERS_COUNT, OPERATIONS_COUNT, MAX_SELECTED_NUMBER} from './util/constants/gameConstants'
import {ADD, SUBTRACT} from './util/constants/operations'


const Lives = (props) => {
    const {remainingLives} = props;
    return (
        <div className="row justify-content-center">
            <div className="col-4">&nbsp;</div>
            <div className="col-2">&nbsp;</div>
            <div className="col-4" style={{textAlign: 'right'}}>Remaining lives:&nbsp;
                {_.times(remainingLives, function (i) {
                    return <FontAwesomeIcon icon="heart" className={'remainingLive'}/>
                })}
            </div>
        </div>
    );
};

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

const RetryButton = (props) => {
    return (
        <button
            className={'btn btn-lg btn-warning'} style={{marginTop: '5px'}} onClick={props.resetGame}>
            <FontAwesomeIcon icon="redo"/>
        </button>
    );
};

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

class App extends Component {
    state = {
        goalNumber: null,
        operations: [],
        selectedNumbers: [],
        remainingLives: NUMBER_LIVES,
        answerIsCorrect: null
    };

    constructor(props) {
        super(props);
        this.possibleOperations = [
            ADD, SUBTRACT
        ];
    }

    componentDidMount() {
        this.resetGame();
    }

    getRandomNumber = () => {
        return _.random(1, MAX_SELECTED_NUMBER);
    };

    getRandomOperation = () => {
        return this.possibleOperations[_.random(0, this.possibleOperations.length - 1)];
    };

    initGoalNumber = () => {
        this.setState({
            goalNumber: this.resolveOperation(this.numbers, this.operations),
            operations: this.operations
        });
    };

    resetGame = () => {
        this.operations = _.times(OPERATIONS_COUNT, this.getRandomOperation);
        this.numbers = _.times(NUMBERS_COUNT, this.getRandomNumber);
        this.initGoalNumber();
        this.setState({answerIsCorrect: null, selectedNumbers: []});
    };

    resolveOperation = (numbers, operations) => {
        let result = numbers[0];
        _.forEach(operations, function (operation, i) {
            switch (operation) {
                case SUBTRACT:
                    result = _.subtract(result, numbers[i + 1]);
                    break;
                case ADD:
                default:
                    result = _.add(result, numbers[i + 1])
            }
        });
        return result
    };

    handleSelectedNumber = (selectedNumber) => {
        (this.state.selectedNumbers.includes(selectedNumber)) ?
            this.removeNumber(selectedNumber) :
            this.addNumber(selectedNumber)
    };

    addNumber = (selectedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: [...prevState.selectedNumbers, selectedNumber]
        }));
    };
    removeNumber = (selectedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(i => i !== selectedNumber)
        }));
    };

    checkOperation = () => {
        (this.resolveOperation(this.state.selectedNumbers, this.state.operations) === this.state.goalNumber) ?
            this.setState({answerIsCorrect: true}) :
            this.setState(prevState => ({answerIsCorrect: false, remainingLives: prevState.remainingLives - 1}))
        ;
    };

    render() {
        return (
            <Game goalNumber={this.state.goalNumber} checkOperation={this.checkOperation}
                  answerIsCorrect={this.state.answerIsCorrect}
                  operations={this.state.operations}
                  selectedNumbers={this.state.selectedNumbers}
                  handleSelectedNumber={this.handleSelectedNumber}
                  remainingLives={this.state.remainingLives}
                  resetGame={this.resetGame}/>
        );
    }
}

export default App;