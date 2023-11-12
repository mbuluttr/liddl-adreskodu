import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '../Button';
import {Colors} from '../../../constants';
import {Text} from 'react-native';

describe('Button', () => {
  it('should render the button with the provided text', () => {
    const {getByTestId} = render(<Button text={'Test'} />);
    expect(getByTestId('Button.Container')).toHaveTextContent('Test');
  });

  it('should render the button with the default colors', () => {
    const {getByTestId} = render(<Button text={'Test'} />);
    expect(getByTestId('Button.Container')).toHaveStyle({
      backgroundColor: Colors.darkBlue,
    });
    expect(getByTestId('Button.Text')).toHaveStyle({
      color: Colors.white,
    });
  });

  it('should render the button with the provided buttonColor and textColor', () => {
    const {getByTestId} = render(
      <Button
        text={'Test'}
        buttonColor={Colors.starYellow}
        textColor={Colors.darkBlue}
      />,
    );
    expect(getByTestId('Button.Container')).toHaveStyle({
      backgroundColor: Colors.starYellow,
    });
    expect(getByTestId('Button.Text')).toHaveStyle({
      color: Colors.darkBlue,
    });
  });

  it('should render the left icon if provided', () => {
    const leftIcon = <Text testID="Left.Icon">Icon</Text>;
    const {getByTestId} = render(<Button text={'Test'} leftIcon={leftIcon} />);
    expect(getByTestId('Left.Icon')).toBeTruthy();
  });

  it('should render the right icon if provided', () => {
    const rightIcon = <Text testID="Right.Icon">Icon</Text>;
    const {getByTestId} = render(
      <Button text={'Test'} rightIcon={rightIcon} />,
    );
    expect(getByTestId('Right.Icon')).toBeTruthy();
  });

  it('should render the loading indicator if loading prop is true', () => {
    const {getByTestId} = render(<Button text={'Test'} loading={true} />);
    expect(getByTestId('LoadingIndicator.Custom')).toBeTruthy();
    expect(() => getByTestId('Button.Text')).toThrow();
  });

  it('should handle onPress event', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<Button text={'Test'} onPress={onPress} />);
    fireEvent.press(getByTestId('Button.Container'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should apply marginTop and marginBottom styles', () => {
    const {getByTestId} = render(
      <Button text={'Test'} marginTop={10} marginBottom={20} />,
    );
    expect(getByTestId('Button.Container').props.style).toMatchObject({
      marginTop: 10,
      marginBottom: 20,
    });
  });
});
