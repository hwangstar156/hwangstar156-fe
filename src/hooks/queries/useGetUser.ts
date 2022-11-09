import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getUser, UserResponse } from '../../api/auth';
import { useEffect, useState } from 'react';

interface useGetUserProps {
  onSuccess?: (data: UserResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

const useGetUser = (config?: useGetUserProps) => {
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
