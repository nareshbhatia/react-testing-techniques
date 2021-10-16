import React from 'react';
import { StringUtils } from '../../utils';
import { ViewCenteredContainer } from '../Containers';

export interface ErrorFallbackComponentProps {
  error: any;
}

/**
 * On a production app this could be a more elaborate component
 */
export const ErrorFallbackComponent = ({
  error,
}: ErrorFallbackComponentProps) => {
  return (
    <ViewCenteredContainer data-testid="error-fallback" className="p-2">
      <h1 className="title">{StringUtils.errorToString(error)}</h1>
    </ViewCenteredContainer>
  );
};
