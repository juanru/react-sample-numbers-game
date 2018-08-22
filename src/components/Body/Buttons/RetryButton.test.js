import React from 'react';
import { shallow } from 'enzyme';
import RetryButton from './RetryButton';

describe('<RetryButton />', () => {
    it('renders a <button>', () => {
        const renderedComponent = shallow(
            <RetryButton/>
        );
        expect(
            renderedComponent.find('button').getElement()
        ).toBeDefined();
    });
    it('handles clicks', () => {
        const onClickSpy = jest.fn();
        const renderedComponent = shallow(<RetryButton resetGame={onClickSpy} />);
        renderedComponent.find('button').simulate('click');
        expect(onClickSpy).toHaveBeenCalled();
    });
});