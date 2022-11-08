import { useEffect, useState } from 'react';

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleCheckLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLogin(!!accessToken);
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return { isLogin, handleCheckLogin };
};

export default useLogin;
