import React from 'react';
import { StringUtils } from '../../utils';

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
    <main>
      <h1>{StringUtils.errorToString(error)}</h1>
    </main>
  );
};
