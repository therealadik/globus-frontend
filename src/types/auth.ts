export interface ErrorResponse {
  message: string;
  path: string;
  timestamp: string;
  details?: ErrorField[];
}

export interface ErrorField {
  field: string;
  message: string;
} 