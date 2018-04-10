import React, {Component} from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'

import {NUMBERS_COUNT, OPERATIONS_COUNT, MAX_SELECTED_NUMBER} from './util/constants/gameConstants'
import {ADD, SUBTRACT} from './util/constants/operations'


const Lives = () => {
    return (
        <div className="row">
            <div className="col-4">&nbsp;</div>
            <div className="col-4">&nbsp;</div>
            <div className="col-4">Remaining lives:</div>
        </div>
    );
};

const Header = () => {
    return (
        <Lives/>
    );
};

const Body = (props) => {
    const {
        goalNumber, answerIsCorrect, checkOperation,
        numbers, operations
    } = props;
    return (
        <div className="row justify-content-center">
            <div className="col-4 column goalColumn">
                <div className="row justify-content-center">Goal number:</div>
                <h1 style={{textAlign: 'center'}}>{goalNumber}</h1>
            </div>
            <div className="col-2">
                <div className="column centeredBox">
                    <Button answerIsCorrect={answerIsCorrect} checkOperation={checkOperation}/>
                </div>

            </div>
            <div className="col-4 column playgroundColumn">
                <div className="row justify-content-center">Math Puzzle:</div>
                <div style={{textAlign: 'center'}}>
                    <Ecuation numbers={numbers} operations={operations}/>
                </div>
            </div>
        </div>
    );
};

const Choices = () => {
    return (
        <div style={{textAlign: 'center'}}>
            {_.times(MAX_SELECTED_NUMBER, function (i) {
                return <div className={'numberCircle'}>{i + 1}</div>
            })}
        </div>
    );
};

const Ecuation = (props) => {
    const {numbers, operations} = props;
    return (
        <div></div>
    );
};

const Button = (props) => {
    const {answerIsCorrect, checkOperation} = props;
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
                    className={'btn btn-lg'}> =
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
            <Header/>
            <Body {...props}/>
            <Choices/>
        </div>
    );
};

class App extends Component {
    state = {
        goalNumber: null,
        numbers: [],
        operations: [],
        selectedNumbers: [],
        answerIsCorrect: null
    };

    constructor(props) {
        super(props);
        this.possibleOperations = [
            ADD, SUBTRACT
        ];
        this.operations = _.times(OPERATIONS_COUNT, this.getRandomOperation);
        this.numbers = _.times(NUMBERS_COUNT, this.getRandomNumber)
    }

    componentDidMount() {
        this.initGoalNumber();
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
            numbers: this.numbers,
            operations: this.operations
        });
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

    checkOperation = () => {

    };

    render() {
        return (
            <Game goalNumber={this.state.goalNumber} checkOperation={this.checkOperation}
                  answerIsCorrect={this.state.answerIsCorrect}
                  numbers={this.state.numbers}
                  operations={this.state.operations}/>
        );
    }
}

export default App;