import React from 'react';
import { render } from '../../test/test-utils';
import {
  CenteredContainer,
  HorizontalContainer,
  ScrollingContainer,
  VerticalContainer,
  ViewCenteredContainer,
  ViewHorizontalContainer,
  ViewVerticalContainer,
} from './Containers';

describe('Containers', () => {
  test('HorizontalContainer renders correctly', () => {
    const { asFragment } = render(
      <HorizontalContainer>Hello World!</HorizontalContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ViewHorizontalContainer renders correctly', () => {
    const { asFragment } = render(
      <ViewHorizontalContainer>Hello World!</ViewHorizontalContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('VerticalContainer renders correctly', () => {
    const { asFragment } = render(
      <VerticalContainer>Hello World!</VerticalContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ViewVerticalContainer renders correctly', () => {
    const { asFragment } = render(
      <ViewVerticalContainer>Hello World!</ViewVerticalContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('CenteredContainer renders correctly', () => {
    const { asFragment } = render(
      <CenteredContainer>Hello World!</CenteredContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ViewCenteredContainer renders correctly', () => {
    const { asFragment } = render(
      <ViewCenteredContainer>Hello World!</ViewCenteredContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ScrollingContainer renders correctly', () => {
    const { asFragment } = render(
      <ScrollingContainer>Hello World!</ScrollingContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
