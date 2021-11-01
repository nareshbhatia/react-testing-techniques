import React from 'react';
import { render } from '../../test/test-utils';
import { NotFoundPage } from './NotFoundPage';

describe('<NotFound />', () => {
  test('renders correctly', () => {
    // -----------------------------------------------------------------
    //                              WARNING
    // -----------------------------------------------------------------
    // This is an example of a snapshot test. In general, snapshot tests
    // are not recommended because:
    //
    // 1. Good tests encode the developer's intention. Snapshot tests lack
    //    expressing the developer's intent as to what the code does as
    //    evident from this test.
    // 2. Developers tend to be undisciplined about scrutinizing snapshots
    //    before committing them, resulting in buggy code to be checked in.
    //
    // If you really must, use snapshot testing only for small focused
    // components. For further details, see
    // https://kentcdodds.com/blog/effective-snapshot-testing
    //
    // Note: We recommend using react-testing-library because it generates
    // cleaner snapshots. The other popular way of generating snapshots is
    // using react-test-renderer, but its output contains component
    // properties and other details that are not relevant.
    // -----------------------------------------------------------------

    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
