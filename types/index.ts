export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PastPurchase {
  id: string;
  timestamp: string;
  items: CartItem[];
  total: number;
  status?: 'to_pay' | 'to_ship' | 'to_receive' | 'to_rate' | 'completed';
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}
