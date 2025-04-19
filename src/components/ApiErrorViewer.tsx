import React from 'react';
import { ApiError } from '../types/api';

interface ApiErrorViewerProps {
  error: ApiError | null;
  className?: string;
}

const ApiErrorViewer: React.FC<ApiErrorViewerProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`rounded-lg bg-red-100 p-4 border border-red-200 ${className}`}>
      <div className="text-sm text-red-700 font-medium mb-2">{error.message}</div>
      {error.details && error.details.length > 0 && (
        <ul className="text-sm text-red-700 space-y-1">
          {error.details.map((detail, index) => (
            <li key={index}>
              {detail.field && <span className="font-medium">{detail.field}: </span>}
              {detail.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiErrorViewer; 