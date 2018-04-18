import React, {Component} from 'react';
import _ from 'lodash'

import {NUMBER_LIVES, NUMBERS_COUNT, OPERATIONS_COUNT, MAX_SELECTED_NUMBER} from './../util/constants/gameConstants'
import {ADD, SUBTRACT} from './../util/constants/operations'

import Game from './Game';

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