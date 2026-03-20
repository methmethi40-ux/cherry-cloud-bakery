import { motion } from 'framer-motion';
import aboutImage from '@/assets/cake-birthday-flowers.jpg';

const About = () => {
  return (
    <main className="pt-28 pb-24">
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb-text">About Us</span>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.85] mt-4 tracking-tight">
              Cherry Cloud<br />Bakers.
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="aspect-[3/2] overflow-hidden rounded-sm shadow-[var(--shadow-soft)]"
          >
            <img src={aboutImage} alt="A beautifully decorated Cherry Cloud cake" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-heading mb-6">Baked with Heart.</h2>
            <div className="space-y-4">
              <p className="body-text">
                Cherry Cloud Bakers is a home-based bakery in Sri Lanka, crafting cupcakes, custom cakes, and bakery goods for every occasion.
              </p>
              <p className="body-text">
                We use fresh, quality ingredients and put love into every creation — from birthday cakes to everyday treats.
              </p>
              <p className="body-text">
                Every order is made fresh. No preservatives, no shortcuts — just honest, delicious baking.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-heading mb-16 text-center">
            What We Promise.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Fresh Ingredients", text: "We bake with real butter, fresh cream, and quality flour — always." },
              { title: "Made to Order", text: "Every cake and cupcake is freshly made when you place your order." },
              { title: "Custom Designs", text: "Tell us your vision and we'll bring it to life — themed cakes, custom colours, you name it." },
            ].map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <h3 className="font-serif text-2xl italic mb-3">{value.title}</h3>
                <p className="body-text">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
