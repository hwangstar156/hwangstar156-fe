import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { ProductsContext } from '../provider/ProductsProvider';

const PaginationPage: NextPage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <Container>
      {products && <ProductList products={products} />}
      <Pagination />
    </Container>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
