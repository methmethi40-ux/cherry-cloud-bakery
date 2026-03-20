import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h3 className="font-serif text-3xl italic mb-2">Cherry Cloud Bakers</h3>
          <p className="body-text max-w-xs">
            Handcrafted cupcakes, custom cakes, and freshly baked goods.
          </p>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-3">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border">
        <p className="breadcrumb-text">© 2026 Cherry Cloud Bakers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
