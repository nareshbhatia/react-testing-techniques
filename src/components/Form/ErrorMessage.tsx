import React from 'react';

export interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) =>
  error !== undefined ? <div className="text-error">{error}</div> : null;
