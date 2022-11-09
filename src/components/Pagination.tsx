import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPageButton = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Button disabled>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {[1, 2, 3, 4, 5].map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={() => handleClickPageButton(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={false}>
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
