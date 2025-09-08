export interface Product {
  id: string;
  name: string;
  weight: string;
  mrp: number;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  phone1: string;
  phone2?: string;
}

export interface Order {
  items: CartItem[];
  customer: CustomerDetails;
  total: number;
}