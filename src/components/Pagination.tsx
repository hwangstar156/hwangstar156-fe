import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import usePagination from '../hooks/usePagination';
import useGetProducts from '../hooks/queries/useGetProducts';
import { ProductsContext } from '../provider/ProductsProvider';
import ErrorMessage from './common/ErrorMessage/ErrorMessage';
import { PAGINATION_LOAD_SIZE } from '../constants/size';

const Pagination = () => {
  //client state
  const {
    currentVisiblePageArray,
    setPageLength,
    currentPage,
    isReady,
    handleClickPageButton,
    isFirstPageIndex,
    isLastPageIndex,
    handleClickePageMoveArrowButton,
  } = usePagination();
  const { setProducts } = useContext(ProductsContext);
  //server state
  const { isError } = useGetProducts(currentPage, isReady, {
    onSuccess(data) {
      const { totalCount, products } = data.data;
      setPageLength(Math.ceil(totalCount / PAGINATION_LOAD_SIZE));
      setProducts(products);
    },
  });

  if (isError) {
    return <ErrorMessage>존재하지 않는 페이지입니다.</ErrorMessage>;
  }

  return (
    <Container>
      <Button disabled={isFirstPageIndex} onClick={() => handleClickePageMoveArrowButton(false)}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {currentVisiblePageArray.map((page) => (
          <Page
            key={page}
            selected={page === Number(currentPage)}
            disabled={page === Number(currentPage)}
            onClick={() => handleClickPageButton(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={isLastPageIndex} onClick={() => handleClickePageMoveArrowButton(true)}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;

  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
