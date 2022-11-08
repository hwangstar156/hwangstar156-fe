import Link from 'next/link';
import styled from 'styled-components';
import useLogin from '../../hooks/useLogin';

const Header = () => {
  const { isLogin, logout, userName } = useLogin();

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

const Container = styled.div`
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
