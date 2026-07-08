import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@api/products';
import { productKeys } from '@api/queryKeys';
import { useLocalProductsStore } from '@store/localProductsStore';
import type { ProductInput, ProductsResponse, Product } from '@shared';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const isLocalId = useLocalProductsStore((state) => state.isLocalId);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductInput }) => {
      if (isLocalId(id)) {
        return Promise.resolve({ ...data, id } as Product);
      }
      return updateProduct(id, data);
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<ProductsResponse>(productKeys.list(undefined), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          products: oldData.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        };
      });
    },
    onError: (error) => {
      console.error('Failed to update product:', error);
    },
  });
};
