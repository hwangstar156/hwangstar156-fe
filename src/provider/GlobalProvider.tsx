import InfinityProductsProvider from './InfinityProductsProvider';
import LoginProvider from './LoginProvider';
import ProductsProvider from './ProductsProvider';
import UserNameProvider from './UserNameProvider';

const GlobalProvier = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoginProvider>
      <UserNameProvider>
        <ProductsProvider>
          <InfinityProductsProvider>{children}</InfinityProductsProvider>
        </ProductsProvider>
      </UserNameProvider>
    </LoginProvider>
  );
};

export default GlobalProvier;
