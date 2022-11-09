import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import useInput from '../hooks/useInput';
import { validateIdFormat, validatePasswordFormat } from '../utilities/validate';
import usePostLogin from '../hooks/queries/usePostLogin';
import useLogin from '../hooks/useLogin';
import withNoAuth from '../components/helper/withNoAuth';
import Input from '../components/common/Input/Input';

const LoginPage: NextPage = () => {
  //client state
  const { loginSuccess } = useLogin();
  const idInputInfo = useInput(validateIdFormat);
  const passwordInputInfo = useInput(validatePasswordFormat);
  // server state
  const { mutate } = usePostLogin({
    onSuccess(data) {
      const {
        accessToken,
        user: { ID, NAME },
      } = data.data.data;
      loginSuccess({ accessToken, userId: ID, userName: NAME });
    },
  });

  const handleSubmitLoginForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!idInputInfo.ref.current || !passwordInputInfo.ref.current) {
      return;
    }

    mutate({
      id: idInputInfo.ref.current.value,
      password: passwordInputInfo.ref.current.value,
    });
  };

  return (
    <Form onSubmit={handleSubmitLoginForm}>
      <Input
        id='id-input'
        type='text'
        labelText='아이디'
        cyId='cy-id-validated-message'
        {...idInputInfo}
      />
      <Input
        id='password-input'
        type='password'
        labelText='비밀번호'
        cyId='cy-password-validated-message'
        {...passwordInputInfo}
      />
      <LoginButton
        disabled={!idInputInfo.inActive || !passwordInputInfo.inActive}
        data-cy='cy-login-button'
      >
        로그인
      </LoginButton>
    </Form>
  );
};

export default withNoAuth(LoginPage);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  cursor: pointer;
  &:disabled {
    background-color: #e2e2ea;
  }
`;
