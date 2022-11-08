import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface LoginSuccessFunctionProps {
  accessToken: string;
  userId: string;
}

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleCheckLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLogin(!!accessToken);
  };

  const loginSuccess = ({ accessToken, userId }: LoginSuccessFunctionProps) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user-id', userId);
    handleCheckLogin();
    router.push('/');
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return { isLogin, loginSuccess };
};

export default useLogin;
