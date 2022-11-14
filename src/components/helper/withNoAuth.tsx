import { NextPage } from 'next';
import { useRouter } from 'next/router';

import useLogin from '../../hooks/useLogin';

type WithNoAuthProps = NextPage | React.FC;

const withNoAuth = (Component: WithNoAuthProps) => {
  const Auth = () => {
    const { isLogin } = useLogin();
    const router = useRouter();

    if (isLogin) {
      router.push('/');
      return;
    }

    return <Component />;
  };

  return Auth;
};

export default withNoAuth;
