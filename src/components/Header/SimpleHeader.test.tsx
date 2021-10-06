import React from 'react';
import { render } from '@testing-library/react';
import { SimpleHeader } from './SimpleHeader';

describe('<SimpleHeader />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<SimpleHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
