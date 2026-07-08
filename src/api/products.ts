import { axiosInstance } from '@api/axiosInstance';
import type { Product, ProductInput, ProductsResponse } from '@shared';

export const fetchProducts = async (params?: {
  limit?: number;
  skip?: number;
}): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>('/products', {
    params,
  });
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductInput): Promise<Product> => {
  const response = await axiosInstance.post<Product>('/products/add', data);
  return response.data;
};

export const updateProduct = async (id: number, data: ProductInput): Promise<Product> => {
  const response = await axiosInstance.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (
  id: number,
): Promise<{
  id: number;
  isDeleted: boolean;
}> => {
  const response = await axiosInstance.delete<{
    id: number;
    isDeleted: boolean;
  }>(`/products/${id}`);
  return response.data;
};
