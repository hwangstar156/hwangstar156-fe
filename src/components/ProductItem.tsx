import { useRouter } from 'next/router';
import styled from 'styled-components';

import useLazyLoadingObserver from '../hooks/useLazyLoadingObserver';
import { Product } from '../types/product';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  const router = useRouter();
  const { imageRef } = useLazyLoadingObserver();

  const handleClickProductItem = () => {
    router.push(`products/${id}`);
  };

  return (
    <Container onClick={handleClickProductItem}>
      <Thumbnail src={'/defaultThumbnail.jpg'} data-src={thumbnail} ref={imageRef} />
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}원</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
