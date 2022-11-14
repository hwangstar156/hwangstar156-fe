import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VISIBLE_PAGE_LENGTH } from '../constants/size';
import { ROUTER_URL } from '../constants/url';

const usePagination = () => {
  const router = useRouter();
  const [pageLength, setPageLength] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const { page } = router.query as { page: string };

  const isFirstPageIndex = pageIndex === 0;
  const isLastPageIndex = pageIndex === Math.floor(pageLength / VISIBLE_PAGE_LENGTH);

  const pageArray = new Array(pageLength).fill(0).map((_, idx) => idx + 1);

  const currentVisiblePageArray = pageArray.slice(
    VISIBLE_PAGE_LENGTH * pageIndex,
    VISIBLE_PAGE_LENGTH * (pageIndex + 1)
  );

  const handleClickPageButton = (page: number) => {
    router.push({ pathname: ROUTER_URL.PAGINATION, query: { page } });
  };

  const handleClickePageMoveArrowButton = (isNext: boolean) => {
    setPageIndex((prev) => (isNext ? prev + 1 : prev - 1));
  };

  useEffect(() => {
    if (pageArray.includes(Number(page))) {
      router.push({
        pathname: ROUTER_URL.PAGINATION,
        query: { page: VISIBLE_PAGE_LENGTH * pageIndex + 1 },
      });
    }
  }, [pageIndex]);

  return {
    currentVisiblePageArray,
    setPageLength,
    currentPage: Number(page),
    isReady: router.isReady,
    handleClickPageButton,
    handleClickePageMoveArrowButton,
    isFirstPageIndex,
    isLastPageIndex,
  };
};

export default usePagination;
