'use client';

import Image from 'next/image';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onImageClick?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, isWishlisted = false, onToggleWishlist, onImageClick }: ProductCardProps) {
  return (
    <motion.div
      id={`product-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col justify-between bg-white dark:bg-slate-900 p-2 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
    >
      <div 
        className={`relative aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 sm:p-6 mix-blend-multiply ${onImageClick ? 'cursor-pointer' : ''}`}
        onClick={() => onImageClick?.(product)}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
        />
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 rounded-full bg-white dark:bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:bg-white dark:bg-slate-900 transition-all shadow-sm z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1 mt-2 sm:mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2 gap-1 sm:gap-0">
          <div className="flex-1">
            <p className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1 line-clamp-1">{product.category}</p>
            <h3 className="text-[11px] sm:text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">
              {product.title}
            </h3>
          </div>
          <span className="text-xs sm:text-lg font-bold text-indigo-600 shrink-0 sm:ml-4">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="hidden sm:block flex-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
          {product.description}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-2 sm:mt-4 py-1.5 sm:py-2 bg-slate-900 text-white text-[10px] sm:text-sm font-bold rounded-md sm:rounded-lg hover:bg-slate-800 transition-colors active:scale-95"
          aria-label={`Add ${product.title} to cart`}
        >
          <span className="hidden sm:inline">Add to Impulse Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </motion.div>
  );
}
