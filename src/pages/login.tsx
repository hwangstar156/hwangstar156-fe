import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import useInput from '../hooks/useInput';
import { validateIdFormat, validatePasswordFormat } from '../utilities/validate';
import usePostLogin from '../hooks/queries/usePostLogin';
import useLogin from '../hooks/useLogin';
import withNoAuth from '../components/helper/withNoAuth';

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
    <>
      <Form onSubmit={handleSubmitLoginForm}>
        <Label htmlFor='id-input'>아이디</Label>
        <TextInput
          type='text'
          id='id-input'
          inActive={isValidatedIdInput}
          ref={idInputElement}
          onBlur={handleBlurIdInput}
        />
        <ValidatedMessage isInValidInput={!isValidatedIdInput} data-cy='cy-id-validated-message'>
          올바른 아이디 형식으로 입력해주세요.
        </ValidatedMessage>
        <Label htmlFor='password-input'>비밀번호</Label>
        <TextInput
          type='password'
          id='password-input'
          ref={passwordInputElement}
          onBlur={handleBlurPasswordInput}
          inActive={isValidatedPasswordInput}
        />
        <ValidatedMessage
          isInValidInput={!isValidatedPasswordInput}
          data-cy='cy-password-validated-message'
        >
          올바른 비밀번호 형식으로 입력해주세요.
        </ValidatedMessage>
        <LoginButton disabled={!isValidatedIdInput || !isValidatedPasswordInput}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default withNoAuth(LoginPage);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const Label = styled.label`
  color: #6c6c7d;
  font-size: 13px;
  font-weight: 700;
  margin-top: 15px;
`;

const TextInput = styled.input<{ inActive: boolean }>`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  border-color: transparent;

  ${({ inActive }) =>
    css`
      background: ${inActive ? '#f7f7fa' : '#FDEDEE'};
    `}
`;

const ValidatedMessage = styled.div<{ isInValidInput: boolean }>`
  color: #ed4e5c;
  font-weight: 400;
  font-size: 13px;
  margin-top: 8px;

  ${({ isInValidInput }) => css`
    opacity: ${isInValidInput ? 1 : 0};
  `}
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
