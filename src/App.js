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
        goalNumber, answerIsCorrect, checkOperation, operations, selectedNumbers
    } = props;

    return (
        <div className="row justify-content-center">
            <div className="col-4 column goalColumn">
                <div className="row justify-content-center">Goal number:</div>
                <h1 style={{textAlign: 'center'}}>{goalNumber}</h1>
            </div>
            <div className="col-2 align-middle">
                <div className="column vcenter">
                    <Button answerIsCorrect={answerIsCorrect} selectedNumbers={selectedNumbers}
                            checkOperation={checkOperation}/>
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
    const {index, handleSelectedNumber, selectedNumbers} = props;
    let choice = null;

    if (selectedNumbers.includes(index + 1)) {
        choice = <div key={index} onClick={() => handleSelectedNumber(index + 1)}
                      className={'numberCircle selected'}>{index + 1}</div>;
    } else {
        if (selectedNumbers.length === NUMBERS_COUNT) {
            choice = <div key={index} className={'numberCircle disabled'}>{index + 1}</div>;
        } else {
            choice =
                <div key={index} onClick={() => handleSelectedNumber(index + 1)}
                     className={'numberCircle'}>{index + 1}</div>;
        }
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

const Button = (props) => {
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
            <Header/>
            <Body {...props}/>
            <Choices handleSelectedNumber={props.handleSelectedNumber} selectedNumbers={props.selectedNumbers}/>
        </div>
    );
};

class App extends Component {
    state = {
        goalNumber: null,
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
            this.setState({answerIsCorrect: false})
        ;
    };

    render() {
        return (
            <Game goalNumber={this.state.goalNumber} checkOperation={this.checkOperation}
                  answerIsCorrect={this.state.answerIsCorrect}
                  operations={this.state.operations}
                  selectedNumbers={this.state.selectedNumbers}
                  handleSelectedNumber={this.handleSelectedNumber}/>
        );
    }
}

export default App;