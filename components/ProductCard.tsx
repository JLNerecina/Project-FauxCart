'use client';

import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      id={`product-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center p-6 mix-blend-multiply">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 mt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.category}</p>
            <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight">
              {product.title}
            </h3>
          </div>
          <span className="text-lg font-bold text-indigo-600 shrink-0 ml-4">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="flex-1 text-xs text-slate-500 line-clamp-2 mt-1">
          {product.description}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors active:scale-95"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Impulse Cart
        </button>
      </div>
    </motion.div>
  );
}
