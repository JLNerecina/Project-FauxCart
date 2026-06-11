import { ShopClient } from '@/components/ShopClient';
import { Product } from '@/types';

// Let the page revalidate dynamically or set to a reasonable time since it's a fake API
export const revalidate = 3600;

export default async function Home() {
  let products: Product[] = [];

  try {
    // DummyJSON provides a larger dataset, fetching up to 50 products
    const response = await fetch('https://dummyjson.com/products?limit=50');
    if (response.ok) {
      const data = await response.json();
      products = data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: {
          rate: p.rating,
          // Fallback to stock or a random seed if review count doesn't exist
          count: p.reviews?.length || p.stock || 120 
        }
      }));
    } else {
      console.error("Failed to fetch products from DummyJSON API");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <ShopClient initialProducts={products} />;
}
