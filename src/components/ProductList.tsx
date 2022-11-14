import styled from 'styled-components';

import ProductItem from './ProductItem';
import { Product } from '../types/product';

interface ProductList {
  products: Product[];
}

const ProductList = ({ products }: ProductList) => {
  return (
    <Container>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
