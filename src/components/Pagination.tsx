import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hooks/usePagination';
import useGetProducts from '../hooks/queries/useGetProducts';
import { ProductsContext } from '../provider/ProductsProvider';

const Pagination = () => {
  //client state
  const {
    pageArray,
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
  useGetProducts(currentPage, isReady, {
    onSuccess(data) {
      setPageLength(Math.ceil(data.data.totalCount / 10));
      setProducts(data.data.products);
    },
  });

  useEffect(() => {
    if (isReady && currentPage === undefined) {
      throw new Error('찾을 수 없는 페이지입니다.');
    }
  }, [currentPage, isReady]);

  return (
    <Container>
      <Button disabled={isFirstPageIndex} onClick={() => handleClickePageMoveArrowButton(false)}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageArray.map((page) => (
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
