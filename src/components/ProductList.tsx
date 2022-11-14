import styled from 'styled-components';

import ProductItem from './ProductItem';
import { Product } from '../types/product';

const ProductList = ({ products }: { products: Product[] }) => {
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
