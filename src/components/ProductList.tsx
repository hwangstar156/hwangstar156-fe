import { useContext } from 'react';
import styled from 'styled-components';

import ProductItem from './ProductItem';
import { InfinityProductsContext } from '../provider/InfinityProductsProvider';

const ProductList = () => {
  const { products } = useContext(InfinityProductsContext);

  return (
    <Container>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
