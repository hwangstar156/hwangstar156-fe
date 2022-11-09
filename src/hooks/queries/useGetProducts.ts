import { GetProductsResponse } from './../../api/products';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { getProducts } from '../../api/products';

interface useGetProductsProps {
  onSuccess?: (data: GetProductsResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

const useGetProducts = (page: string, isReady: boolean, config?: useGetProductsProps) => {
  const { data, refetch } = useQuery<GetProductsResponse, AxiosError<{ message: string }>>(
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

  return { products: data?.data.products };
};

export default useGetProducts;
