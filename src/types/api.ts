export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  details?: ValidationError[];
} 