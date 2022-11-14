import { NextPage } from 'next';
import { useRouter } from 'next/router';

import useLogin from '../../hooks/useLogin';

const withNoAuth = (Component: NextPage | React.FC) => {
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
