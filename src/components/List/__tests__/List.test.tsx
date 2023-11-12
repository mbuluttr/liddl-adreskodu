import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import List from '../List';
import data from '../__tests__/__mocks__/List.mock.json';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  })),
}));

describe('List', () => {
  const onItemPress = jest.fn();

  it('should render a title', () => {
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={data}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    expect(getByTestId('List.HeaderTitle')).toHaveTextContent('Test Title');
  });

  it('should call onItemPress when item press', () => {
    const {getAllByTestId} = render(
      <List
        title={'Test Title'}
        data={data}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    const items = getAllByTestId('List.Item');
    fireEvent.press(items[0]);
    expect(onItemPress).toHaveBeenCalled();
  });

  it('should render a loading indicator when loading is true', () => {
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={data}
        onItemPress={onItemPress}
        isSearched={false}
        loading={true}
      />,
    );
    expect(getByTestId('LoadingIndicator.FullPage')).toBeTruthy();
  });

  it('should render items from the data prop', () => {
    const {getAllByTestId} = render(
      <List
        title={'Test Title'}
        data={data}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    const items = getAllByTestId('List.Item');
    expect(items[0]).toHaveTextContent('ADANA');
  });

  it('should render an empty state with searched text when isSearched is true', () => {
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={[]}
        onItemPress={onItemPress}
        isSearched={true}
        loading={false}
      />,
    );
    expect(getByTestId('List.EmptySearchedText')).toBeTruthy();
  });

  it('should render an empty state with default text when isSearched is false', () => {
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={[]}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    expect(getByTestId('List.EmptyText')).toBeTruthy();
  });

  it('should navigates back when the back button is pressed in the empty state', () => {
    const mockNavigate = jest.fn();
    require('@react-navigation/native').useNavigation.mockReturnValue({
      goBack: mockNavigate,
    });
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={[]}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    const emptyText = getByTestId('List.EmptyText');
    expect(emptyText).toBeTruthy();
    fireEvent.press(getByTestId('List.BackButton'));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should navigates to the home screen when the home button is pressed in the empty state', () => {
    const mockNavigate = jest.fn();
    require('@react-navigation/native').useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
    const {getByTestId} = render(
      <List
        title={'Test Title'}
        data={[]}
        onItemPress={onItemPress}
        isSearched={false}
        loading={false}
      />,
    );
    fireEvent.press(getByTestId('List.HomeButton'));
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
