export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
}
