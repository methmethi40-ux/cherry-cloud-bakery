// ============================================================
// CHERRY CLOUD BAKERS — Product Catalog
// ============================================================
// To add a new product, just add an entry to the appropriate
// category array below. Each product needs:
//   id:          unique URL-safe slug (e.g. "vanilla-dream")
//   name:        display name
//   price:       price in LKR
//   image:       imported image (add import at top) OR a URL string
//   description: short selling description
//   ingredients: list of key ingredients (optional for cakes)
// ============================================================

import chocolateImg from '@/assets/cupcake-chocolate.jpg';
import vanillaImg from '@/assets/cupcake-vanilla.jpg';
import caramelImg from '@/assets/cupcake-caramel.jpg';
import matchaImg from '@/assets/cupcake-matcha.jpg';
import roseImg from '@/assets/cupcake-rose.jpg';
import lavenderImg from '@/assets/cupcake-lavender.jpg';

import cakeFruit from '@/assets/cake-fruit.jpg';
import cakeBirthdayFlowers from '@/assets/cake-birthday-flowers.jpg';
import cakeRoses from '@/assets/cake-roses.jpg';
import cakeCar from '@/assets/cake-car.jpg';
import cakeMath from '@/assets/cake-math.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

export interface Category {
  slug: string;
  label: string;
  description: string;
  products: Product[];
}

// ─── CUPCAKES ───────────────────────────────────────────────
export const cupcakes: Product[] = [
  {
    id: "dark-chocolate-ganache",
    name: "Dark Chocolate Ganache",
    price: 850,
    image: chocolateImg,
    description: "Single-origin Ecuadorian cacao meets hand-tempered ganache. A study in depth — bittersweet, velvet, and unapologetically dark.",
    ingredients: ["72% Ecuadorian cacao", "French butter", "Madagascar vanilla", "Organic flour"],
  },
  {
    id: "tahitian-vanilla",
    name: "Tahitian Vanilla",
    price: 750,
    image: vanillaImg,
    description: "We source our vanilla from small-batch farmers in Tahiti. Every swirl of Swiss meringue buttercream is intentional.",
    ingredients: ["Tahitian vanilla bean", "Swiss meringue", "Free-range eggs", "Organic cream"],
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel",
    price: 900,
    image: caramelImg,
    description: "Slow-cooked caramel kissed with Himalayan pink salt. The tension between sweet and saline, resolved in every bite.",
    ingredients: ["Himalayan pink salt", "Aged butter caramel", "Brown sugar", "Heavy cream"],
  },
  {
    id: "ceremonial-matcha",
    name: "Ceremonial Matcha",
    price: 950,
    image: matchaImg,
    description: "Ceremonial-grade matcha from Uji, Kyoto — stone-ground and folded into white chocolate ganache. Earthy. Precise. Meditative.",
    ingredients: ["Uji ceremonial matcha", "White chocolate", "Organic milk", "Rice flour"],
  },
  {
    id: "rose-pistachio",
    name: "Rose & Pistachio",
    price: 900,
    image: roseImg,
    description: "Persian rosewater meets Sicilian pistachios. A cupcake that bridges continents — floral, nutty, and quietly luxurious.",
    ingredients: ["Persian rosewater", "Sicilian pistachios", "Cardamom", "Almond flour"],
  },
  {
    id: "lavender-honey",
    name: "Lavender & Honey",
    price: 850,
    image: lavenderImg,
    description: "Provençal lavender infused into local wildflower honey. Delicate, aromatic, and reminiscent of a late-summer garden.",
    ingredients: ["Provençal lavender", "Wildflower honey", "Lemon zest", "Organic butter"],
  },
];

// ─── CAKES ──────────────────────────────────────────────────
export const cakes: Product[] = [
  {
    id: "tropical-fruit-cake",
    name: "Tropical Fruit Cake",
    price: 4500,
    image: cakeFruit,
    description: "Whipped cream layered cake topped with fresh strawberries, kiwi, and mango. Light, refreshing, and perfect for celebrations.",
    ingredients: ["Fresh strawberries", "Kiwi", "Mango", "Whipped cream", "Vanilla sponge"],
  },
  {
    id: "flower-garden-cake",
    name: "Flower Garden Cake",
    price: 3800,
    image: cakeBirthdayFlowers,
    description: "A cheerful buttercream cake adorned with hand-piped floral decorations in pink and red. Made to brighten any birthday.",
    ingredients: ["Buttercream frosting", "Vanilla sponge", "Food-safe colours"],
  },
  {
    id: "rose-elegance-cake",
    name: "Rose Elegance Cake",
    price: 5200,
    image: cakeRoses,
    description: "Two-tone buttercream cake with hand-piped rosettes. A statement piece for milestone celebrations.",
    ingredients: ["Swiss buttercream", "Vanilla sponge", "Rose extract"],
  },
  {
    id: "car-adventure-cake",
    name: "Car Adventure Cake",
    price: 6500,
    image: cakeCar,
    description: "A fun sculpted car cake that brings childhood dreams to life. Fully custom and hand-decorated with buttercream.",
    ingredients: ["Chocolate sponge", "Buttercream", "Fondant details"],
  },
  {
    id: "math-genius-cake",
    name: "Math Genius Cake",
    price: 3500,
    image: cakeMath,
    description: "Cream cheese frosted cake decorated with piped equations and formulas. The perfect treat for the brainy ones.",
    ingredients: ["Red velvet sponge", "Cream cheese frosting", "Chocolate piping"],
  },
];

// ─── BAKERY ITEMS ───────────────────────────────────────────
// Add your bakery items here (cookies, brownies, bread, etc.)
export const bakeryItems: Product[] = [
  // Example:
  // {
  //   id: "chocolate-brownie",
  //   name: "Chocolate Brownie",
  //   price: 350,
  //   image: someImport,
  //   description: "Fudgy dark chocolate brownie with a crackly top.",
  //   ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar"],
  // },
];

// ─── CATEGORIES (used by Products page) ─────────────────────
export const categories: Category[] = [
  {
    slug: "cupcakes",
    label: "Cupcakes",
    description: "Boutique cupcakes, each one hand-piped and seasonal.",
    products: cupcakes,
  },
  {
    slug: "cakes",
    label: "Cakes",
    description: "Custom cakes for every occasion — birthdays, celebrations, and more.",
    products: cakes,
  },
  {
    slug: "bakery-items",
    label: "Bakery Items",
    description: "Cookies, brownies, and freshly baked goods.",
    products: bakeryItems,
  },
];

// Flat list of all products (for product detail lookup)
export const products: Product[] = [...cupcakes, ...cakes, ...bakeryItems];
