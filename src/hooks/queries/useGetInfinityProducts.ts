import { useContext, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getInfinityProducts } from '../../api/products';
import { INFINITY_SCROLL_LOAD_SIZE, FIRST_PAGE } from '../../constants/size';
import { InfinityProductsContext } from '../../provider/InfinityProductsProvider';

const useGetInfinityProducts = ({
  page,
  setCurrentPage,
}: {
  page: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setProducts } = useContext(InfinityProductsContext);
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infinity-products'],
    ({ pageParam = page }) => getInfinityProducts({ page: pageParam }),
    {
      getNextPageParam: ({ data, nextPage }) => {
        const totalPageLength = Math.ceil(data.data.totalCount / INFINITY_SCROLL_LOAD_SIZE);
        page !== nextPage && setCurrentPage(nextPage);
        return page > totalPageLength ? undefined : nextPage;
      },
      refetchOnWindowFocus: false,
      enabled: page === FIRST_PAGE,
    }
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const products = data.pages.flatMap((page) => page.data.data.products);
    setProducts(products);
  }, [data]);

  return { data, fetchNextPage, hasNextPage };
};

export default useGetInfinityProducts;
