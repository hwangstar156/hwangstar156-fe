import { useState, createContext, Dispatch, SetStateAction } from 'react';

interface UserNameProviderValueType {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

export const UserNameContext = createContext<UserNameProviderValueType>({
  userName: '',
  setUserName: () => void 0,
});

const UserNameProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserNameContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameProvider;
