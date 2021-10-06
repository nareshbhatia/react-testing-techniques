import React from 'react';
import { render } from '../../test/test-utils';
import { Header } from './Header';

describe('<Header />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
