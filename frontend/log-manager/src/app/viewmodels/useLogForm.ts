'use client';

import { useCallback, useState } from 'react';
import { Log, logSchema } from '../types/Log';
import { ZodError } from 'zod';
type PartialLogData = Omit<Log, '_id'> & {
  _id?: string}
export const useLogForm = (initial?: PartialLogData) => {
  const [form, setFormState] = useState<PartialLogData>(
    initial || {
      description: '',
      eventDate: '',
      location: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof PartialLogData, string>>>({});

  const setForm = (field: keyof Log, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    try {
      logSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: Partial<Record<keyof Log, string>> = {};
        for (const issue of err.issues) {
          const field = issue.path[0] as keyof Log;
          newErrors[field] = issue.message;
        }
        setErrors(newErrors);
      }
      return false;
    }
  };

  const setInitialForm = useCallback((data: Log) => {
    setFormState({
        _id: data._id,
      description: data.description,
      eventDate: new Date(data.eventDate).toISOString(),
      location: data.location,
    });
  }, []);

  const reset = () => {
    setFormState({  description: '', eventDate: '', location: '' });
    setErrors({});
  };

  return { form, setForm, errors, validate, reset, setInitialForm };
};