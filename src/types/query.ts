import { AxiosError, AxiosResponse } from 'axios';

export interface UseQueryConfigProps<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

export interface UseMutationConfigProps<TData> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}
