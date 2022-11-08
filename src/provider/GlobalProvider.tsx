import LoginProvider from './LoginProvider';
import UserNameProvider from './UserNameProvider';

const GlobalProvier = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoginProvider>
      <UserNameProvider>{children}</UserNameProvider>
    </LoginProvider>
  );
};

export default GlobalProvier;
