import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getUser, UserResponse } from '../../api/auth';
import { UseQueryConfigProps } from '../../types/query';

const useGetUser = (config?: UseQueryConfigProps<UserResponse>) => {
  const [userId, setUserId] = useState<string | null>(null);

  useQuery<UserResponse, AxiosError<{ message: string }>>(
    'user',
    () => getUser({ userId: userId! }),
    { enabled: !!userId, ...config }
  );

  useEffect(() => {
    setUserId(localStorage.getItem('user-id'));
  }, []);
};

export default useGetUser;
