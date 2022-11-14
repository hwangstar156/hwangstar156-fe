import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { ROUTER_URL } from '../constants/url';

const HomePage: NextPage = () => {
  return (
    <>
      <Container>
        <Link href={`${ROUTER_URL.PAGINATION}?page=1`}>
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href={`${ROUTER_URL.INFINITY_SCROLL}`}>
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
