import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl italic tracking-tight">
          Cherry Cloud
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'text-foreground' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'text-foreground' : ''}`}>Shop</Link>
          <Link to="/custom-order" className={`nav-link ${isActive('/custom-order') ? 'text-foreground' : ''}`}>Custom Order</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-foreground' : ''}`}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
