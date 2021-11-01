import React from 'react';
import { App } from './App';
import { HomePage, NotFoundPage } from './pages';
import { render, screen } from './test/test-utils';

jest.mock('./pages/HomePage/HomePage');
jest.mock('./pages/NotFoundPage/NotFoundPage');

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (HomePage as jest.Mock).mockImplementation(() => <div>HomePageMock</div>);

    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('HomePageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    // Act
    render(<App />, { initialRoute: '/invalid/route' });

    // Assert
    expect(screen.getByText('NotFoundMock')).toBeTruthy();
  });
});
