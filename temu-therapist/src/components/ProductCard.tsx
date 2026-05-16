import { motion } from "framer-motion";
import { Star, ShoppingCart, Flame, Users } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: () => void;
}

export function ProductCard({ product, index = 0, onAddToCart }: ProductCardProps) {
  const viewers = Math.floor(Math.random() * 40) + 12;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border-4 border-orange-500 bg-white shadow-[4px_4px_0_#e63900]"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, type: "spring" }}
      whileHover={{ scale: 1.02, boxShadow: "6px 6px 0 #e63900" }}
    >
      <motion.div
        className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100 text-6xl sm:h-36 sm:text-7xl"
        animate={product.imageUrl ? undefined : { backgroundColor: ["#fff7ed", "#fef9c3", "#fff7ed"] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span>{product.emoji}</span>
        )}
        {product.imageUrl && (
          <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px]" aria-hidden>
            {product.emoji}
          </span>
        )}
        <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-0.5 text-[10px] font-black text-white animate-shake">
          -{Math.floor(Math.random() * 30 + 70)}%
        </span>
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-neon-green">
          <Users className="h-3 w-3" />
          {viewers} viewing
        </span>
      </motion.div>

      <motion.div className="p-3">
        <span className="inline-block rounded bg-gold px-2 py-0.5 text-[9px] font-black uppercase text-black">
          {product.tag}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-black text-gray-900">{product.name}</h3>

        <motion.div className="mt-1 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-amber-400" : "fill-gray-200"}`}
            />
          ))}
          <span className="text-xs font-bold text-gray-600">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </motion.div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-red-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-red-600">
          <Flame className="h-3 w-3" />
          LIMITED HEALING STOCK
        </div>

        <motion.button
          type="button"
          onClick={onAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-orange-500 py-2.5 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000] hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
