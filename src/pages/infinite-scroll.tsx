import type { NextPage } from 'next';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import useObserver from '../hooks/useObserver';
import useGetInfinityProducts from '../hooks/queries/useGetInfinityProducts';
import useScrollMemory from '../hooks/useScrollMemory';
import { InfinityProductsContext } from '../provider/InfinityProductsProvider';

const InfiniteScrollPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products } = useContext(InfinityProductsContext);

  const { fetchNextPage, hasNextPage } = useGetInfinityProducts({
    page: currentPage,
    setCurrentPage,
  });

  const handleIntersect = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const { handleElementRef } = useObserver({ hasNext: !!hasNextPage, callback: handleIntersect });
  useScrollMemory();

  return (
    <>
      <Container>
        <ProductList products={products} />
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
