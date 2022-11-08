import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { LoginContext } from '../provider/LoginProvider';
import { UserNameContext } from '../provider/UserNameProvider';

interface LoginSuccessFunctionProps {
  accessToken: string;
  userId: string;
  userName: string;
}

const useLogin = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserNameContext);
  const router = useRouter();

  const handleCheckLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLogin(!!accessToken);
  };

  const loginSuccess = ({ accessToken, userId, userName }: LoginSuccessFunctionProps) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user-id', userId);
    setUserName(userName);
    handleCheckLogin();
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user-id');
    handleCheckLogin();
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return { isLogin, logout, loginSuccess, userName };
};

export default useLogin;
