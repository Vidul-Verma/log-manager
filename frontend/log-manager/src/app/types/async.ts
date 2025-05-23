export type AsyncData<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
  };