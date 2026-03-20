import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OWNER_WHATSAPP_NUMBER } from '@/lib/notifications';

const occasionOptions = ['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Graduation', 'Other'];

const CustomOrder = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    occasion: '',
    cakeType: '',
    servings: '',
    flavour: '',
    details: '',
    date: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.cakeType) {
      toast.error('Please fill in your name, phone, and cake type.');
      return;
    }

    const lines = [
      `🎂 *Custom Cake Order — Cherry Cloud Bakers*`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.occasion && `Occasion: ${form.occasion}`,
      `Cake Type: ${form.cakeType}`,
      form.servings && `Servings: ${form.servings}`,
      form.flavour && `Flavour: ${form.flavour}`,
      form.date && `Needed by: ${form.date}`,
      form.details && `\nDetails:\n${form.details}`,
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(lines);
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    toast.success('Opening WhatsApp — send the message to confirm your order!');
  };

  return (
    <main className="pt-28 pb-24 px-6 min-h-svh">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight mb-3">
            Custom Order
          </h1>
          <p className="body-text text-muted-foreground mb-10 max-w-md">
            Have something special in mind? Tell us about your dream cake and
            we'll make it happen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="breadcrumb-text">Your Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="mt-1"
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="breadcrumb-text">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="mt-1"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Occasion */}
            <div>
              <Label className="breadcrumb-text mb-2 block">Occasion</Label>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update('occasion', form.occasion === opt ? '' : opt)}
                    className={`px-4 py-2 rounded-sm text-sm font-sans border transition-colors active:scale-[0.97] ${
                      form.occasion === opt
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Cake details */}
            <div>
              <Label htmlFor="cakeType" className="breadcrumb-text">Cake Type *</Label>
              <Input
                id="cakeType"
                placeholder="e.g. 2-tier birthday cake, cupcake set of 12"
                value={form.cakeType}
                onChange={(e) => update('cakeType', e.target.value)}
                className="mt-1"
                maxLength={200}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servings" className="breadcrumb-text">Servings / Size</Label>
                <Input
                  id="servings"
                  placeholder="e.g. 20 people, 1 kg"
                  value={form.servings}
                  onChange={(e) => update('servings', e.target.value)}
                  className="mt-1"
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="flavour" className="breadcrumb-text">Flavour</Label>
                <Input
                  id="flavour"
                  placeholder="e.g. Chocolate, Red Velvet"
                  value={form.flavour}
                  onChange={(e) => update('flavour', e.target.value)}
                  className="mt-1"
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="date" className="breadcrumb-text">Date Needed</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="details" className="breadcrumb-text">Additional Details</Label>
              <textarea
                id="details"
                rows={4}
                value={form.details}
                onChange={(e) => update('details', e.target.value)}
                placeholder="Colours, theme, inscriptions, reference images…"
                maxLength={1000}
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm resize-none"
              />
            </div>

            <button type="submit" className="btn-acquire w-full">
              Send via WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default CustomOrder;
