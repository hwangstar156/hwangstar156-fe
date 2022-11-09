import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import useGetProducts from '../hooks/queries/useGetProducts';
import { useRef } from 'react';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query as { page: string };
  const pageLength = useRef(0);

  const { products } = useGetProducts(page, router.isReady, {
    onSuccess(data) {
      pageLength.current = Math.ceil(data.data.totalCount / 10);
      console.log(data.data.products);
    },
  });

  useEffect(() => {
    if (router.isReady && page === undefined) {
      throw new Error('찾을 수 없는 페이지입니다.');
    }
  }, [page]);

  return (
    <>
      <Container>
        {products && <ProductList products={products.slice(0, 10)} />}{' '}
        <Pagination currentPage={page} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
