import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from './Loading';

describe('<Loading />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
