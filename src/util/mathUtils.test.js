import {resolveOperation, getRandomOperation, getRandomNumber, possibleOperations} from "./mathUtils";
import {ADD, SUBTRACT} from "./constants/operations";
import {MAX_SELECTED_NUMBER} from "./constants/gameConstants";


describe('getRandomNumber()', () => {
    it('Is greater than 0', () => {
        expect(getRandomNumber()).toBeGreaterThan(0);
    });

    it("Is less than MAX Constant", () => {
        expect(getRandomNumber()).toBeLessThan(MAX_SELECTED_NUMBER);
    });
});

describe('resolveOperation()', () => {
    it('resolves correctly 1 addition operation: 3 + 5', () => {
        expect(resolveOperation([3,5],[ADD])).toBe(8);
    });
    it('resolves correctly 2 addition operations: 3 + 5 + 13', () => {
        expect(resolveOperation([3,5,13],[ADD, ADD])).toBe(21);
    });
    it('resolves correctly 1 subtraction operation: 3 - 5', () => {
        expect(resolveOperation([3,5],[SUBTRACT])).toBe(-2);
    });
    it('resolves correctly 2 subtraction operations: 8 - 3 - 2', () => {
        expect(resolveOperation([8,3,2],[SUBTRACT, SUBTRACT])).toBe(3);
    });
    it('resolves correctly 1 complex equation with several operations: 8 - 13 + 2 - 6', () => {
        expect(resolveOperation([8,13,2,6],[SUBTRACT, ADD, SUBTRACT])).toBe(-9);
    });
});

describe('getRandomOperation()', () => {
    it('returns 1 of the possible operations', () => {
        expect(possibleOperations).toContain(getRandomOperation());
    });
});


describe('possibleOperations', () => {
    it('contains Addition', () => {
        expect(possibleOperations).toContain(ADD);
    });
    it('contains Subtraction', () => {
        expect(possibleOperations).toContain(SUBTRACT);
    });
});