import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@api/products';
import { productKeys } from '@api/queryKeys';
import { useLocalProductsStore } from '@store/localProductsStore';
import { generateLocalId } from '@utils/generateLocalId';
import type { ProductInput, ProductsResponse } from '@shared';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const addLocalId = useLocalProductsStore((state) => state.addLocalId);

  return useMutation({
    mutationFn: (data: ProductInput) => createProduct(data),
    onSuccess: (serverProduct, variables) => {
      queryClient.setQueryData<ProductsResponse>(productKeys.list(undefined), (oldData) => {
        if (!oldData) return oldData;

        const existingIds = oldData.products.map((p) => p.id);
        const localId = generateLocalId(existingIds);
        addLocalId(localId);

        const productWithLocalId = {
          ...serverProduct,
          id: localId,
          ...variables,
        };

        return {
          ...oldData,
          products: [productWithLocalId, ...oldData.products],
          total: oldData.total + 1,
        };
      });
    },
  });
};
