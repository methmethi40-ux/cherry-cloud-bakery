import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { triggerPayment } from '@/lib/payhere';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Colombo',
  });

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="pt-28 pb-24 px-6 min-h-svh flex items-center justify-center">
        <div className="text-center">
          <h1 className="section-heading mb-4">Not Found</h1>
          <Link to="/products" className="nav-link">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAcquire = () => {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    if (!customerInfo.firstName || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in your name, email, and phone number.');
      return;
    }

    const orderId = `${product.id}-${Date.now()}`;
    const total = product.price * quantity;

    triggerPayment(orderId, total, `${product.name} x${quantity}`, customerInfo, {
      onCompleted: () => {
        toast.success('Order placed successfully!');
        sendWhatsAppNotification({
          orderId,
          productName: product.name,
          quantity,
          total,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerPhone: customerInfo.phone,
        });
        navigate('/');
      },
      onDismissed: () => {
        toast.info('Payment was cancelled.');
      },
      onError: (error) => {
        toast.error(`Payment error: ${error}`);
      },
    });
  };

  return (
    <main className="pt-28 pb-24 px-6 min-h-svh">
      <div className="max-w-7xl mx-auto">
        <nav className="breadcrumb-text mb-12">
          <Link to="/products" className="hover:text-foreground transition-colors">Shop</Link>
          {' / '}
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-square overflow-hidden bg-muted rounded-sm shadow-[var(--shadow-soft)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md"
          >
            <h1 className="text-5xl font-serif italic mb-4 tracking-tight">{product.name}</h1>
            <p className="body-text mb-8 leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <span className="breadcrumb-text">Ingredients</span>
              <ul className="mt-3 space-y-1">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="body-text text-sm">{ing}</li>
                ))}
              </ul>
            </div>

            <div className="text-3xl font-sans mb-8">
              LKR {(product.price * quantity).toFixed(2)}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="breadcrumb-text">Quantity</span>
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 font-sans text-sm hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-sans text-sm tabular-nums min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 font-sans text-sm hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 mb-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="breadcrumb-text">First Name *</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="breadcrumb-text">Last Name</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="breadcrumb-text">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="breadcrumb-text">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="breadcrumb-text">Address</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="breadcrumb-text">City</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </motion.div>
            )}

            <button onClick={handleAcquire} className="btn-acquire">
              {showForm ? 'Pay Now' : 'Acquire'}
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
