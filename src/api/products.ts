import { fakeStoreAxios, localDataAxios } from '@api/axiosInstance';
import {
  getProductsDataSource,
  isLocalProductsDataSource,
  setProductsDataSource,
} from '@api/dataSource';
import {
  mapFakeStoreToProduct,
  mapProductInputToFakeStore,
  mapProductInputToProduct,
  type FakeStoreProduct,
} from '@api/productMapper';
import type { Product, ProductInput, ProductsResponse } from '@shared';

const LOCAL_PRODUCTS_URL = 'data/products.json';
const MOCK_DELAY_MS = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const paginateProducts = (
  products: Product[],
  params?: { limit?: number; skip?: number },
): ProductsResponse => {
  const skip = params?.skip ?? 0;
  const limit = params?.limit ?? products.length;

  return {
    products: products.slice(skip, skip + limit),
    total: products.length,
    skip,
    limit,
  };
};

const fetchLocalProducts = async (params?: {
  limit?: number;
  skip?: number;
}): Promise<ProductsResponse> => {
  const response = await localDataAxios.get<ProductsResponse>(LOCAL_PRODUCTS_URL);
  setProductsDataSource('local');
  return paginateProducts(response.data.products, params);
};

export const fetchProducts = async (params?: {
  limit?: number;
  skip?: number;
}): Promise<ProductsResponse> => {
  if (getProductsDataSource() === 'local') {
    return fetchLocalProducts(params);
  }

  try {
    const response = await fakeStoreAxios.get<FakeStoreProduct[]>('/products');
    setProductsDataSource('fakestore');

    const products = response.data.map(mapFakeStoreToProduct);
    return paginateProducts(products, params);
  } catch {
    return fetchLocalProducts(params);
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  if (isLocalProductsDataSource()) {
    const { products } = await fetchLocalProducts();
    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new Error('Товар не найден');
    }

    return product;
  }

  const response = await fakeStoreAxios.get<FakeStoreProduct>(`/products/${id}`);
  return mapFakeStoreToProduct(response.data);
};

export const createProduct = async (data: ProductInput): Promise<Product> => {
  if (isLocalProductsDataSource()) {
    await delay(MOCK_DELAY_MS);
    return mapProductInputToProduct(Date.now(), data);
  }

  const response = await fakeStoreAxios.post<FakeStoreProduct>(
    '/products',
    mapProductInputToFakeStore(data),
  );

  return {
    ...mapFakeStoreToProduct(response.data),
    brand: data.brand,
    stock: data.stock,
  };
};

export const updateProduct = async (id: number, data: ProductInput): Promise<Product> => {
  if (isLocalProductsDataSource()) {
    await delay(MOCK_DELAY_MS);
    return mapProductInputToProduct(id, data);
  }

  const response = await fakeStoreAxios.put<FakeStoreProduct>(
    `/products/${id}`,
    mapProductInputToFakeStore(data),
  );

  return {
    ...mapFakeStoreToProduct(response.data),
    brand: data.brand,
    stock: data.stock,
  };
};

export const deleteProduct = async (
  id: number,
): Promise<{
  id: number;
  isDeleted: boolean;
}> => {
  if (isLocalProductsDataSource()) {
    await delay(MOCK_DELAY_MS);
    return { id, isDeleted: true };
  }

  await fakeStoreAxios.delete(`/products/${id}`);
  return { id, isDeleted: true };
};
