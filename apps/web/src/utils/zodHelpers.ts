import { ZodError } from 'zod';

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export function getZodErrors<T extends object>(error: unknown): FormErrors<T> {
  if (error instanceof ZodError) {
    const fieldErrors = {} as FormErrors<T>;
    
    error.issues.forEach((issue) => {
      if (issue.path[0]) {
        const fieldName = issue.path[0] as keyof T;
        fieldErrors[fieldName] = issue.message;
      }
    });
    
    return fieldErrors;
  }
  
  return {};
}