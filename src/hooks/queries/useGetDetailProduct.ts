import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getDetailProduct } from './../../api/products';
import { GetDetailProductResponse } from '../../api/products';

interface useGetDetailProductProps {
  onSuccess?: (data: GetDetailProductResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

const useGetDetailProduct = (productId: string, config?: useGetDetailProductProps) => {
  const { data } = useQuery<GetDetailProductResponse, AxiosError<{ message: string }>>(
    ['product-detail', productId],
    () => getDetailProduct({ productId }),
    config
  );

  return { product: data?.data.product };
};

export default useGetDetailProduct;
