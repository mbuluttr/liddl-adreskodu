import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../Header';

describe('Header', () => {
  it('should renders a back button', () => {
    const {getByTestId} = render(<Header onPress={jest.fn()} />);
    expect(getByTestId('Header.BackButton')).toBeTruthy();
  });

  it('should disabled the back button when disabled prop is true', () => {
    const {getByTestId} = render(
      <Header onPress={jest.fn()} disabled={true} />,
    );
    expect(getByTestId('Header.BackButton')).toBeDisabled();
  });

  it('should render a search input when searchable prop is provided', () => {
    const {getByTestId} = render(
      <Header
        onPress={jest.fn()}
        searchable={{value: '', onChangeText: jest.fn(), placeholder: 'Search'}}
      />,
    );
    expect(getByTestId('Header.SearchContainer')).toBeTruthy();
    expect(getByTestId('Header.SearchInput')).toBeTruthy();
  });

  it('should updates the search input value when text is entered', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <Header
        onPress={jest.fn()}
        searchable={{value: '', onChangeText, placeholder: 'Search'}}
      />,
    );
    fireEvent.changeText(getByTestId('Header.SearchInput'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });

  it('should render the clear button when there is a value in the search input', () => {
    const {getByTestId} = render(
      <Header
        onPress={jest.fn()}
        searchable={{
          value: 'Test',
          onChangeText: jest.fn(),
          placeholder: 'Search',
        }}
      />,
    );
    expect(getByTestId('Header.ClearSearch')).toBeTruthy();
  });

  it('should clear the search input when the clear button is pressed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <Header
        onPress={jest.fn()}
        searchable={{value: 'test', onChangeText, placeholder: 'Search'}}
      />,
    );
    fireEvent.press(getByTestId('Header.ClearSearch'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });
});
