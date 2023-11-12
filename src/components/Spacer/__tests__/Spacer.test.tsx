import React from 'react';
import {render} from '@testing-library/react-native';
import Spacer from '../Spacer';

describe('Spacer', () => {
  it('should render with a height when horizontal is false or not provided', () => {
    const size = 20;
    let {getByTestId, rerender} = render(<Spacer size={size} />);
    const spacer = getByTestId('Spacer.Container');
    expect(spacer).toHaveStyle({height: size});
    rerender(<Spacer horizontal={false} size={size} />);
    expect(spacer).toHaveStyle({height: size});
  });

  it('should render with a width when horizontal is true', () => {
    const size = 20;
    const {getByTestId} = render(<Spacer horizontal={true} size={size} />);
    const spacer = getByTestId('Spacer.Container');
    expect(spacer).toHaveStyle({width: size});
  });
});
