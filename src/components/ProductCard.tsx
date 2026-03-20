import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Product } from '@/lib/products';

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/products/${product.id}`} className="group cursor-pointer block">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="aspect-[4/5] overflow-hidden bg-muted mb-4 rounded-sm shadow-[var(--shadow-soft)]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif text-2xl italic">{product.name}</h3>
            <span className="price-text text-sm">
              LKR {product.price.toFixed(2)}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
