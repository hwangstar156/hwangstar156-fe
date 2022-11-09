import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { Product } from '../types/product';

interface ProductsProviderValueType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const ProductsContext = createContext<ProductsProviderValueType>({
  products: [],
  setProducts: () => void 0,
});

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
