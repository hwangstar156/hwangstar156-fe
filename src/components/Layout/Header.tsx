import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';
import useGetUser from '../../hooks/queries/useGetUser';
import useLogin from '../../hooks/useLogin';
import { UserNameContext } from '../../provider/UserNameProvider';

const Header = () => {
  //client state
  const { isLogin, logout, userName } = useLogin();
  const { setUserName } = useContext(UserNameContext);
  //server state
  useGetUser({
    onSuccess(data) {
      setUserName(data.data.user.NAME);
    },
  });

  return (
    <Container>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {isLogin ? (
        <div>
          <div>{userName}</div>
          <LogoutButton onClick={logout}>logout</LogoutButton>
        </div>
      ) : (
        <Link href='/login'>login</Link>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
