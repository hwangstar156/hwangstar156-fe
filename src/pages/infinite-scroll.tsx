import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import useObserver from '../hooks/useObserver';
import useGetInfinityProducts from '../hooks/queries/useGetInfinityProducts';

const InfiniteScrollPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchNextPage, hasNextPage } = useGetInfinityProducts({
    page: currentPage,
    setCurrentPage,
  });

  const handleIntersect = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const { handleElementRef } = useObserver({ hasNext: !!hasNextPage, callback: handleIntersect });

  return (
    <>
      <Container>
        <ProductList />
        <div ref={handleElementRef}></div>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
