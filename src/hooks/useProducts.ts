import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@api/products';
import { productKeys } from '@api/queryKeys';

export const useProducts = (params?: { limit?: number; skip?: number }) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
  });
};
