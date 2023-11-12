import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render the full-page loading indicator when fullPage is true', () => {
    const {getByTestId} = render(<LoadingIndicator fullPage={true} />);

    expect(getByTestId('LoadingIndicator.FullPage')).toBeTruthy();
    expect(getByTestId('LoadingIndicator.ActivityIndicator')).toBeTruthy();
  });

  it('should render the custom loading indicator when fullPage is false', () => {
    const {getByTestId} = render(<LoadingIndicator fullPage={false} />);

    expect(getByTestId('LoadingIndicator.Custom')).toBeTruthy();
    expect(getByTestId('LoadingIndicator.ActivityIndicator')).toBeTruthy();
  });

  it('applies custom styles when provided', () => {
    const {getByTestId} = render(
      <LoadingIndicator
        customHeight={100}
        paddingTop={10}
        paddingBottom={10}
        alignSelf={'center'}
      />,
    );

    expect(getByTestId('LoadingIndicator.Custom')).toHaveStyle({
      height: 100,
      paddingTop: 10,
      paddingBottom: 10,
      alignSelf: 'center',
    });
  });
});
