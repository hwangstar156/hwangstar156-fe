import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled, { css } from 'styled-components';

const LoginPage: NextPage = () => {
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <Label htmlFor='id-input'>아이디</Label>
        <TextInput type='text' id='id-input' inActive={true} />
        <Label htmlFor='password-input'>비밀번호</Label>
        <TextInput type='password' id='password-input' inActive={false} />
        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
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

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
