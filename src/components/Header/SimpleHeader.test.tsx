import React from 'react';
import { render } from '../../test/test-utils';
import { SimpleHeader } from './SimpleHeader';

describe('<SimpleHeader />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<SimpleHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
