import React, {Component} from 'react';
import _ from 'lodash'

import {NUMBER_LIVES, NUMBERS_COUNT, OPERATIONS_COUNT} from './../util/constants/gameConstants'
import {resolveOperation, getRandomNumber, getRandomOperation} from './../util/mathUtils'

import Game from './Game';

class App extends Component {
    state = {
        goalNumber: null,
        operations: [],
        selectedNumbers: [],
        remainingLives: NUMBER_LIVES,
        answerIsCorrect: null
    };

    componentDidMount() {
        this.resetGame();
    }

    resetGame = () => {
        this.operations = _.times(OPERATIONS_COUNT, getRandomOperation);
        this.numbers = _.times(NUMBERS_COUNT, getRandomNumber);
        this.initGoalNumber();
    };

    initGoalNumber = () => {
        this.setState({
            goalNumber: resolveOperation(this.numbers, this.operations),
            operations: this.operations,
            answerIsCorrect: null,
            selectedNumbers: []
        });
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

    operationIsCorrect = (selectedNumbers, operations, goalNumber) => {
        return this.resolveOperation(selectedNumbers, operations) === goalNumber
    };

    checkOperation = () => {
        (this.operationIsCorrect(this.state.selectedNumbers, this.state.operations, this.state.goalNumber)) ?
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