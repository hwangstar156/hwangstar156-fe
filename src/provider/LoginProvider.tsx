import { useState, createContext, Dispatch, SetStateAction } from 'react';

interface LoginProviderValueType {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginProviderValueType>({
  isLogin: false,
  setIsLogin: () => void 0,
});

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
