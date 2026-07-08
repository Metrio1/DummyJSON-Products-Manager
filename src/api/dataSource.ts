export type ProductsDataSource = 'fakestore' | 'local';

let currentSource: ProductsDataSource | null = null;

export const getProductsDataSource = (): ProductsDataSource | null => currentSource;

export const setProductsDataSource = (source: ProductsDataSource): void => {
  currentSource = source;
};

export const isLocalProductsDataSource = (): boolean => currentSource === 'local';
