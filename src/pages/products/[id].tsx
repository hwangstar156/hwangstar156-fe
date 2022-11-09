import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useGetDetailProduct from '../../hooks/queries/useGetDetailProduct';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { product } = useGetDetailProduct(id);

  return (
    <>
      <Thumbnail src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product?.name}</Name>
        <Price>{product?.price.toLocaleString()}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
