import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePagination = () => {
  const router = useRouter();
  const [pageLength, setPageLength] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const { page } = router.query as { page: string };

  const isFirstPageIndex = pageIndex === 0;
  const isLastPageIndex = pageIndex === Math.floor(pageLength / 5);

  const pageArray = new Array(pageLength)
    .fill(0)
    .map((_, idx) => idx + 1)
    .slice(5 * pageIndex, 5 * (pageIndex + 1));

  const handleClickPageButton = (page: number) => {
    router.push({ pathname: '/pagination', query: { page } });
  };

  const handleClickePageMoveArrowButton = (isNext: boolean) => {
    setPageIndex((prev) => (isNext ? prev + 1 : prev - 1));
  };

  useEffect(() => {
    router.push({ pathname: '/pagination', query: { page: 5 * pageIndex + 1 } });
  }, [pageIndex]);

  return {
    pageArray,
    setPageLength,
    currentPage: page,
    isReady: router.isReady,
    handleClickPageButton,
    handleClickePageMoveArrowButton,
    isFirstPageIndex,
    isLastPageIndex,
  };
};

export default usePagination;
