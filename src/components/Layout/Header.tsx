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
        <>
          <div>{userName}</div>
          <div onClick={logout}>logout</div>
        </>
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
