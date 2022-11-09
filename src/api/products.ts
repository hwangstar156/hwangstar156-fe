import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

export interface GetProductsRequestProps {
  page: string;
}

export interface GetProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export const getProducts = async ({ page }: GetProductsRequestProps) => {
  const data = await axios.get<GetProductsResponse>(`/products?page=${page}&size=10`);

  return data.data;
};
