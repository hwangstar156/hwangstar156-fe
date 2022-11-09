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
  const {
    inputElement: idInputElement,
    handleBlurInput: handleBlurIdInput,
    isValidatedInput: isValidatedIdInput,
  } = useInput(validateIdFormat);
  const {
    inputElement: passwordInputElement,
    handleBlurInput: handleBlurPasswordInput,
    isValidatedInput: isValidatedPasswordInput,
  } = useInput(validatePasswordFormat);
  // server state
  const { mutate } = usePostLogin({
    onSuccess(data) {
      const accessToken = data.data.data.accessToken;
      const userId = data.data.data.user.ID;
      const userName = data.data.data.user.NAME;
      loginSuccess({ accessToken, userId, userName });
    },
  });

  const handleSubmitLoginForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!idInputElement.current || !passwordInputElement.current) {
      return;
    }

    mutate({
      id: idInputElement.current.value,
      password: passwordInputElement.current.value,
    });
  };

  return (
    <Form onSubmit={handleSubmitLoginForm}>
      <Input
        id='id-input'
        type='text'
        inActive={isValidatedIdInput}
        labelText='아이디'
        ref={idInputElement}
        onBlur={handleBlurIdInput}
        cyId='cy-id-validated-message'
      />
      <Input
        id='password-input'
        type='password'
        inActive={isValidatedPasswordInput}
        labelText='비밀번호'
        ref={passwordInputElement}
        onBlur={handleBlurPasswordInput}
        cyId='cy-password-validated-message'
      />
      <LoginButton
        disabled={!isValidatedIdInput || !isValidatedPasswordInput}
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
