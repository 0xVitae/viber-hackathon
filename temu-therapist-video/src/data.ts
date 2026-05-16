export type Product = {
  id: string;
  name: string;
  price: string;
  original: string;
  emoji: string;
  tag: string;
  rating: number;
  reviews: number;
};

export const PRODUCTS: Product[] = [
  {
    id: "shrimp-slippers",
    name: "LED Shrimp Slippers",
    price: "$1.48",
    original: "$89.99",
    emoji: "🦐",
    tag: "EMOTIONAL SUPPORT CERTIFIED",
    rating: 4.9,
    reviews: 18342,
  },
  {
    id: "crying-pillow",
    name: "USB Crying Pillow",
    price: "$2.33",
    original: "$45.00",
    emoji: "😭",
    tag: "CRY-TO-CHARGE™",
    rating: 4.7,
    reviews: 9281,
  },
  {
    id: "banana-holder",
    name: "Tactical Banana Holder",
    price: "$0.99",
    original: "$34.50",
    emoji: "🍌",
    tag: "ALPHA POTASSIUM",
    rating: 4.8,
    reviews: 44102,
  },
  {
    id: "support-duck",
    name: "Emotional Support Duck",
    price: "$0.87",
    original: "$12.99",
    emoji: "🦆",
    tag: "FDA-ADJACENT",
    rating: 5.0,
    reviews: 67201,
  },
  {
    id: "incense-launcher",
    name: "Bluetooth Incense Launcher",
    price: "$3.12",
    original: "$127.00",
    emoji: "🧘",
    tag: "WELLNESS WEAPONIZED",
    rating: 4.6,
    reviews: 3104,
  },
  {
    id: "mini-frogs",
    name: "500 Miniature Frogs",
    price: "$0.87",
    original: "$500.00",
    emoji: "🐸",
    tag: "PURPOSE IN A BAG",
    rating: 5.0,
    reviews: 99999,
  },
];

export const POPUPS = [
  "🚨 Karen in Ohio just bought 5 LED Shrimp Slippers!",
  "💸 FLASH SALE: Therapy 74% OFF — 12 sec left",
  "👁️ 1,283 people are healing right now",
  "🎁 SPIN THE WHEEL — guaranteed prize!",
  "⚡ Cart abandoned: 30% extra discount unlocked",
  "🧠 New trauma detected — Bundle generated",
  "🔥 Selling fast — only 2 left!",
  "💖 You deserve this. (Add to cart)",
];
