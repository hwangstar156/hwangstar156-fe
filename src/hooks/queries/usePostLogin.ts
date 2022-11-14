import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import { LoginSuccessResponse, postLogin, PostLoginRequestProps } from '../../api/auth';
import { UseMutationConfigProps } from '../../types/query';

const usePostLogin = (config?: UseMutationConfigProps<LoginSuccessResponse>) => {
  const { mutate } = useMutation<
    AxiosResponse<LoginSuccessResponse>,
    AxiosError<{ message: string }>,
    PostLoginRequestProps
  >('login', postLogin, config);

  return { mutate };
};

export default usePostLogin;
