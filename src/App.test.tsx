import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from './App';
import { HomePage, NotFoundPage } from './pages';

jest.mock('./pages/HomePage/HomePage');
jest.mock('./pages/NotFoundPage/NotFoundPage');

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (HomePage as jest.Mock).mockImplementation(() => <div>HomePageMock</div>);

    // Act
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('HomePageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    // Act
    render(
      <MemoryRouter initialEntries={['/invalid/route']}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('NotFoundMock')).toBeTruthy();
  });
});
