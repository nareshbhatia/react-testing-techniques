import React from 'react';
import { Meta } from '@storybook/react';
import { SimpleHeader } from '../Header';
import {
  CenteredContainer,
  HorizontalContainer,
  ScrollingContainer,
  VerticalContainer,
  ViewCenteredContainer,
  ViewHorizontalContainer,
  ViewVerticalContainer,
} from './Containers';

export default {
  title: 'Components/Containers',
  component: HorizontalContainer,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const CenteredContainerStory = () => {
  return (
    <ViewVerticalContainer>
      <SimpleHeader />
      <CenteredContainer className="bg-primary-50">
        <h1 className="title">Centered Container</h1>
      </CenteredContainer>
    </ViewVerticalContainer>
  );
};
CenteredContainerStory.storyName = 'CenteredContainer';

export const HorizontalContainerStory = () => {
  return (
    <ViewVerticalContainer>
      <SimpleHeader />
      <HorizontalContainer>
        <VerticalContainer className="bg-primary-50 p-2">
          <h1 className="title">Left</h1>
        </VerticalContainer>
        <VerticalContainer className="bg-secondary-main p-2">
          <h1 className="title">Right</h1>
        </VerticalContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
HorizontalContainerStory.storyName = 'HorizontalContainer';

export const VerticalContainerStory = () => {
  return (
    <ViewVerticalContainer>
      <SimpleHeader />
      <VerticalContainer>
        <VerticalContainer className="bg-primary-50 p-2">
          <h1 className="title">Top</h1>
        </VerticalContainer>
        <VerticalContainer className="bg-secondary-main p-2">
          <h1 className="title">Bottom</h1>
        </VerticalContainer>
      </VerticalContainer>
    </ViewVerticalContainer>
  );
};
VerticalContainerStory.storyName = 'VerticalContainer';

export const ViewCenteredContainerStory = () => {
  return (
    <ViewCenteredContainer className="bg-primary-50">
      <h1 className="title">View Centered Container</h1>
    </ViewCenteredContainer>
  );
};
ViewCenteredContainerStory.storyName = 'ViewCenteredContainer';

export const ViewHorizontalContainerStory = () => {
  return (
    <ViewHorizontalContainer>
      <VerticalContainer className="bg-primary-50 p-2">
        <h1 className="title">Left</h1>
      </VerticalContainer>
      <VerticalContainer className="bg-secondary-main p-2">
        <h1 className="title">Right</h1>
      </VerticalContainer>
    </ViewHorizontalContainer>
  );
};
ViewHorizontalContainerStory.storyName = 'ViewHorizontalContainer';

export const ViewVerticalContainerStory = () => {
  return (
    <ViewVerticalContainer>
      <VerticalContainer className="bg-primary-50 p-2">
        <h1 className="title">Top</h1>
      </VerticalContainer>
      <VerticalContainer className="bg-secondary-main p-2">
        <h1 className="title">Bottom</h1>
      </VerticalContainer>
    </ViewVerticalContainer>
  );
};
ViewVerticalContainerStory.storyName = 'ViewVerticalContainer';

// For scrolling to work correctly, the scrolling container must set overflow
// to 'auto'. However, more importantly, the parent of the scrolling container
// should have min-height set to 0. Without this, scrolling with not work. See
// the two StackOverflow questions below:
// https://stackoverflow.com/questions/55896508/nested-scrolling-containers-using-flexbox
// https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size
export const ScrollingContainerStory = () => {
  return (
    <ViewVerticalContainer>
      <SimpleHeader />
      <HorizontalContainer className="min-h-0">
        <ScrollingContainer className="w-320 bg-primary-50">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="bg-primary-main m-2 rounded"
              style={{ height: 60 }}
            />
          ))}
        </ScrollingContainer>
        <ScrollingContainer className="flex-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="bg-secondary-main m-2 rounded"
              style={{ height: 120 }}
            />
          ))}
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
ScrollingContainerStory.storyName = 'ScrollingContainer';
