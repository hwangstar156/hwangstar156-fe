import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { getProducts, GetProductsResponse } from '../../api/products';
interface useGetProductsProps {
  onSuccess?: (data: GetProductsResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

const useGetProducts = (page: number, isReady: boolean, config?: useGetProductsProps) => {
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
