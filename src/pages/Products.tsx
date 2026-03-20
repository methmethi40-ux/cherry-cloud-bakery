import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/lib/products';

const Products = () => {
  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="breadcrumb-text">Our Menu</span>
          <h1 className="section-heading mt-4">Every Crumb, Considered.</h1>
        </motion.div>

        {categories.map((cat) => {
          if (cat.products.length === 0) return null;
          return (
            <section key={cat.slug} className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-serif italic tracking-tight">{cat.label}</h2>
                <p className="body-text mt-2">{cat.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {cat.products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Products;
