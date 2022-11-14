import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { getProducts, GetProductsResponse } from '../../api/products';
import { UseQueryConfigProps } from '../../types/query';

const useGetProducts = (
  page: number,
  isReady: boolean,
  config?: UseQueryConfigProps<GetProductsResponse>
) => {
  const { data, refetch, isError } = useQuery<GetProductsResponse, AxiosError<{ message: string }>>(
    ['products', page],
    () => getProducts({ page }),
    {
      enabled: false,
      ...config,
    }
  );

  useEffect(() => {
    if (isReady) {
      refetch();
    }
  }, [page]);

  return { products: data?.data.products, isError };
};

export default useGetProducts;
