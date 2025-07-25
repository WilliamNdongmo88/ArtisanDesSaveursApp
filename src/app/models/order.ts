// models/order.model.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  origin: string;
  price: number;
  unit: string;
  featured: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  freeShipping: boolean;
}