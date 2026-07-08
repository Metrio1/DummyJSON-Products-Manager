import type { Product, ProductInput } from '@shared';
import { getProductPlaceholder } from '@utils/getProductImage';

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const mapFakeStoreToProduct = (item: FakeStoreProduct): Product => {
  const thumbnail = getProductPlaceholder(item.title);

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    brand: item.category,
    stock: 25,
    rating: 4.5,
    thumbnail,
    images: [thumbnail],
  };
};

export const mapProductInputToFakeStore = (data: ProductInput): Omit<FakeStoreProduct, 'id'> => ({
  title: data.title,
  price: data.price,
  description: data.description,
  category: data.category,
  image: getProductPlaceholder(data.title),
});

export const mapProductInputToProduct = (id: number, data: ProductInput): Product => {
  const thumbnail = getProductPlaceholder(data.title);

  return {
    id,
    title: data.title,
    description: data.description,
    price: data.price,
    category: data.category,
    brand: data.brand,
    stock: data.stock,
    rating: 4.5,
    thumbnail,
    images: [thumbnail],
  };
};
