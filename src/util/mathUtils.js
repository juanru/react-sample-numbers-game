import _ from "lodash";
import {ADD, SUBTRACT} from "./constants/operations";
import {MAX_SELECTED_NUMBER} from "./constants/gameConstants";

export const possibleOperations = [
    ADD, SUBTRACT
];

export const getRandomNumber = () => {
    return getRandomNumberInRange(1, MAX_SELECTED_NUMBER);
};

export const getRandomNumberInRange = (minValue, maxValue) => {
    return _.random(minValue, maxValue);
};

export const getRandomOperation = () => {
    return possibleOperations[_.random(0, possibleOperations.length - 1)];
};

export const resolveOperation = (numbers, operations) => {
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