import axios from 'axios';
import { HOME_URL } from '../constants/url';
import { Product } from '../types/product';

export interface GetProductsRequestProps {
  page: number;
  size?: number;
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

export const getProducts = async ({ page = 1, size = 10 }: GetProductsRequestProps) => {
  const data = await axios.get<GetProductsResponse>(
    `${HOME_URL}/products?page=${page}&size=${size}`
  );

  return data.data;
};

export const getInfinityProducts = async ({ page }: GetProductsRequestProps) => {
  const data = await axios.get<GetProductsResponse>(`${HOME_URL}/products?page=${page}&size=16`);

  return { data: data.data, nextPage: page + 1 };
};

export const getDetailProduct = async ({ productId }: GetDetailProductRequestProps) => {
  const data = await axios.get<GetDetailProductResponse>(`${HOME_URL}/products/${productId}`);

  return data.data;
};
