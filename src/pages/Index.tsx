import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/cake-fruit.jpg';
import ProductCard from '@/components/ProductCard';
import { cupcakes, cakes } from '@/lib/products';

const Index = () => {
  const featured = [...cupcakes.slice(0, 2), ...cakes.slice(0, 1)];

  return (
    <main>
      {/* Hero */}
      <section className="min-h-svh flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.85] mb-8 tracking-tight">
              Cherry<br />Cloud.
            </h1>
            <p className="text-xl max-w-md body-text leading-relaxed">
              Handcrafted cupcakes, custom cakes & freshly baked goods — made with love in Sri Lanka.
            </p>
            <Link to="/products" className="btn-primary inline-block mt-12">
              Browse Our Menu
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-soft)]">
              <img
                src={heroImage}
                alt="Fresh fruit cake by Cherry Cloud Bakers"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 py-24 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="breadcrumb-text">Featured</span>
            <h2 className="section-heading mt-4">Our Favourites.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/products" className="btn-primary inline-block">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif italic leading-snug"
          >
            "Every cake tells a story. We just make sure it tastes as good as it looks."
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default Index;
