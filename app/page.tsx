import { ShopClient } from '@/components/ShopClient';
import { Product } from '@/types';

// Let the page revalidate dynamically or set to a reasonable time since it's a fake API
export const revalidate = 3600;

export default async function Home() {
  let products: Product[] = [];

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.ok) {
      products = await response.json();
    } else {
      console.error("Failed to fetch products from FakeStore API");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <ShopClient initialProducts={products} />;
}
