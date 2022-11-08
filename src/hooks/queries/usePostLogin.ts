import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import { LoginSuccessResponse, postLogin, PostLoginRequestProps } from '../../api/auth';

interface usePostLoginProps {
  onSuccess?: (data: AxiosResponse<LoginSuccessResponse>) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

const usePostLogin = (config?: usePostLoginProps) => {
  const { mutate } = useMutation<
    AxiosResponse<LoginSuccessResponse>,
    AxiosError<{ message: string }>,
    PostLoginRequestProps
  >('login', postLogin, config);

  return { mutate };
};

export default usePostLogin;
