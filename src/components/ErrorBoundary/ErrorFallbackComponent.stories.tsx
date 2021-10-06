import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ErrorFallbackComponent } from './ErrorFallbackComponent';

export default {
  title: 'Components/ErrorFallbackComponent',
  component: ErrorFallbackComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

/**
 * This story uses args to define how the ErrorFallbackComponent is rendered.
 * You can dynamically change these args in the Controls addon panel in
 * Storybook. See https://storybook.js.org/docs/react/essentials/controls.
 */
const Template: Story = (args) => <ErrorFallbackComponent error={args.error} />;

export const ErrorFallbackComponentStory = Template.bind({});
ErrorFallbackComponentStory.storyName = 'ErrorFallbackComponent';
ErrorFallbackComponentStory.args = { error: 'Network Error' };
