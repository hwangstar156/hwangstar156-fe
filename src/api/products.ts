import axios from 'axios';
import { Product } from '../types/product';

export interface GetProductsRequestProps {
  page: string;
}

export interface GetProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export interface GetDetailProductRequestProps {
  productId: string;
}

export interface GetDetailProductResponse {
  data: {
    product: Product;
  };
}

export const getProducts = async ({ page }: GetProductsRequestProps) => {
  const data = await axios.get<GetProductsResponse>(`/products?page=${page}&size=10`);

  return data.data;
};

export const getDetailProduct = async ({ productId }: GetDetailProductRequestProps) => {
  const data = await axios.get<GetDetailProductResponse>(`/products/${productId}`);

  return data.data;
};
