import { useContext, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getInfinityProducts } from '../../api/products';
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
        const totalPageLength = Math.ceil(data.data.totalCount / 16);
        page !== nextPage && setCurrentPage(nextPage);
        return page > totalPageLength ? undefined : nextPage;
      },
      refetchOnWindowFocus: false,
      enabled: page === 1,
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
