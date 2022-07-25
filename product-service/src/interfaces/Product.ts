export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Stock {
  productId: string;
  quantity: number;
}
