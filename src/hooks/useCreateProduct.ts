import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isLocalProductsDataSource } from '@api/dataSource';
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

        let product = {
          ...serverProduct,
          ...variables,
        };

        if (isLocalProductsDataSource()) {
          const existingIds = oldData.products.map((p) => p.id);
          const localId = generateLocalId(existingIds);
          addLocalId(localId);
          product = { ...product, id: localId };
        }

        return {
          ...oldData,
          products: [product, ...oldData.products],
          total: oldData.total + 1,
        };
      });
    },
  });
};
