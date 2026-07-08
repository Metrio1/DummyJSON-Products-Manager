import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@api/products';
import { productKeys } from '@api/queryKeys';
import { useLocalProductsStore } from '@store/localProductsStore';
import type { ProductsResponse } from '@shared';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const isLocalId = useLocalProductsStore((state) => state.isLocalId);
  const removeLocalId = useLocalProductsStore((state) => state.removeLocalId);

  return useMutation({
    mutationFn: (id: number) => {
      if (isLocalId(id)) {
        return Promise.resolve({ id, isDeleted: true });
      }
      return deleteProduct(id);
    },
    onSuccess: (result) => {
      queryClient.setQueryData<ProductsResponse>(productKeys.list(undefined), (oldData) => {
        if (!oldData) return oldData;

        if (isLocalId(result.id)) {
          removeLocalId(result.id);
        }

        return {
          ...oldData,
          products: oldData.products.filter((product) => product.id !== result.id),
          total: oldData.total - 1,
        };
      });
    },
    onError: (error) => {
      console.error('Failed to delete product:', error);
    },
  });
};
