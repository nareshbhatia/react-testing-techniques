import React from 'react';
import { Meta } from '@storybook/react';
import { Loading } from './Loading';

export default {
  title: 'Components/Loading',
  component: Loading,
} as Meta;

export const LoadingStory = () => {
  return <Loading />;
};
LoadingStory.storyName = 'Loading';
