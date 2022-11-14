import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getDetailProduct } from './../../api/products';
import { GetDetailProductResponse } from '../../api/products';
import { UseQueryConfigProps } from '../../types/query';

const useGetDetailProduct = (
  productId: string,
  config?: UseQueryConfigProps<GetDetailProductResponse>
) => {
  const { data, isError } = useQuery<GetDetailProductResponse, AxiosError<{ message: string }>>(
    ['product-detail', productId],
    () => getDetailProduct({ productId }),
    config
  );

  return { product: data?.data.product, isError };
};

export default useGetDetailProduct;
