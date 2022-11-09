import { useRouter } from 'next/router';
import { useState } from 'react';

const usePagination = () => {
  const router = useRouter();
  const [pageLength, setPageLength] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const { page } = router.query as { page: string };

  const pageArray = new Array(pageLength)
    .fill(0)
    .map((_, idx) => idx + 1)
    .slice(5 * pageIndex, 5 * (pageIndex + 1));

  const handleClickPageButton = (page: number) => {
    router.push({ pathname: '/pagination', query: { page } });
  };

  return {
    pageArray,
    setPageLength,
    currentPage: page,
    isReady: router.isReady,
    handleClickPageButton,
    setPageIndex,
  };
};

export default usePagination;
