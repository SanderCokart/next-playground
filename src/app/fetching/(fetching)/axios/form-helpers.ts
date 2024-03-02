import type { FieldErrors } from './api';
import type { UseFormSetError } from 'react-hook-form';

/**
 * Set validation errors for react-hook-form
 * It sets the error for the email field to 'This is a required field'
 *
 * @param setError - react-hook-form setError function
 * @param fields - object with fields and their error messages
 * @param parentKey - parent key for nested fields
 *
 * @example - usage
 * import { setValidationErrors } from './form-helpers';
 * import { useForm } from 'react-hook-form';
 *
 * const { setError } = useForm();
 *
 * // with helper
 *
 * const fields = {
 *   email: {
 *     message: 'This is a required field',
 *     all:['This is a required field']
 *   }
 * };
 *
 * setValidationErrors(setError, fields);
 *
 * // without helper
 *
 * const fields = {
 *   email: {
 *    message: 'This is a required field',
 *    all: ['This is a required field'],
 *   }
 * }
 *
 * setError('email', {
 *   type: 'manual',
 *   message: fields.email.message,
 * });
 */
const setValidationErrors = <DATA extends Record<string, any>>(
  setError: UseFormSetError<any>,
  fields?: FieldErrors<DATA>,
  parentKey: string = '',
) => {
  if (!fields) return;

  Object.entries(fields).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if ('message' in value && 'all' in value) {
      setError(fullKey, {
        type: 'manual',
        message: value.message,
      });
    } else {
      setValidationErrors(setError, value as FieldErrors<any>, fullKey);
    }
  });
};

export { setValidationErrors };
