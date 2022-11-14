import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { Product } from '../types/product';

interface InfinityProductsProviderValueType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const InfinityProductsContext = createContext<InfinityProductsProviderValueType>({
  products: [],
  setProducts: () => void 0,
});

const InfinityProductsProvider = ({ children }: WithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <InfinityProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </InfinityProductsContext.Provider>
  );
};

export default InfinityProductsProvider;
