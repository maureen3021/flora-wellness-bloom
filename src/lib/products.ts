export type Product = {
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
};

export type Category =
  | "Immune Booster"
  | "Sport Fit"
  | "Heart & Blood Fit"
  | "Suma Fit"
  | "Men's Power"
  | "Smart Kids"
  | "Women's Beauty"
  | "Suma Living"
  | "Others";

export const CATEGORIES: { name: Category; blurb: string }[] = [
  { name: "Immune Booster", blurb: "Strengthen your natural defenses." },
  { name: "Sport Fit", blurb: "Performance, recovery & endurance." },
  { name: "Heart & Blood Fit", blurb: "Cardiovascular & circulation care." },
  { name: "Suma Fit", blurb: "Whole-body balance & vitality." },
  { name: "Men's Power", blurb: "Stamina, vigor & prostate support." },
  { name: "Smart Kids", blurb: "Nutrition for growing minds & bodies." },
  { name: "Women's Beauty", blurb: "Radiance, hormones & skin glow." },
  { name: "Suma Living", blurb: "Daily wellness essentials." },
  { name: "Others", blurb: "Specialty formulas & remedies." },
];

export const PRODUCTS: Product[] = [
  { name: "X Power Man Plus Capsules", price: 6634, oldPrice: 7371, category: "Men's Power" },
  { name: "X Power Coffee", price: 2370, oldPrice: 2632.5, category: "Men's Power" },
  { name: "ProstatRelax Capsules", price: 3791, oldPrice: 4212, category: "Men's Power" },
  { name: "Feminergy Capsules", price: 4739, oldPrice: 5265, category: "Women's Beauty" },
  { name: "FemiCare (Feminine Cleanser)", price: 1738, oldPrice: 1930.5, category: "Women's Beauty" },
  { name: "GymEffect", price: 3159, oldPrice: 3510, category: "Sport Fit" },
  { name: "Dr. Ts Toothpaste", price: 869, oldPrice: 965.25, category: "Suma Living" },
  { name: "Probio3 (Strawberry) 30's", price: 4815, oldPrice: 5350, category: "Immune Booster" },
  { name: "ConstiRelax Oral Solution", price: 4581, oldPrice: 5089.5, category: "Others" },
  { name: "Pure & Broken Ganoderma Spores (30's)", price: 9162, oldPrice: 10179, category: "Immune Booster" },
  { name: "Pure & Broken Ganoderma Spores (60's)", price: 17375, oldPrice: 19305, category: "Immune Booster" },
  { name: "Ez-Xlim", price: 8214, oldPrice: 9126, category: "Suma Fit" },
  { name: "Veggie Veggie", price: 4739, oldPrice: 5265, category: "Smart Kids" },
  { name: "Blueberry Chewable Tablets", price: 3791, oldPrice: 4212, category: "Smart Kids" },
  { name: "Calcium & Vitamin D3 Milk Tablets", price: 3791, oldPrice: 4212, category: "Smart Kids" },
  { name: "Vitamin C Chewable Tablets", price: 3159, oldPrice: 3510, category: "Smart Kids" },
  { name: "Ganoderma Spores Oil Capsules (60's)", price: 20218, oldPrice: 22464, category: "Immune Booster" },
  { name: "Youth Essence Facial Cream", price: 5371, oldPrice: 5967, category: "Women's Beauty" },
  { name: "Youth Essence Facial Mask", price: 2844, oldPrice: 3159, category: "Women's Beauty" },
  { name: "Youth Essence Toner", price: 4265, oldPrice: 4738, category: "Women's Beauty" },
  { name: "Youth Essence Lotion", price: 3949, oldPrice: 4387, category: "Women's Beauty" },
  { name: "Youth Refreshing Facial Cleanser", price: 3475, oldPrice: 3861, category: "Women's Beauty" },
  { name: "Refined Yunzhi Essence", price: 4581, oldPrice: 5089.5, category: "Immune Booster" },
  { name: "4 in 1 Cordyceps Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living" },
  { name: "4-in-1 Ginseng Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living" },
  { name: "4-in-1 Reishi Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living" },
  { name: "Quad-Reishi Capsules", price: 5529, oldPrice: 6142.5, category: "Immune Booster" },
  { name: "Coolroll (1 Dozen)", price: 1896, oldPrice: 2106, category: "Suma Living" },
  { name: "ArthroXtra Tablets", price: 6318, oldPrice: 7020, category: "Suma Fit" },
  { name: "Novel Depile Capsules", price: 3475, oldPrice: 3861, category: "Others" },
  { name: "GluzoJoint-F Capsules", price: 4423, oldPrice: 4914, category: "Suma Fit" },
  { name: "CereBrain", price: 3949, oldPrice: 4387.5, category: "Smart Kids" },
  { name: "ZaminoCal Plus Capsules", price: 3633, oldPrice: 4036, category: "Suma Fit" },
  { name: "Anatic Herbal Essence Soap", price: 348, oldPrice: 386.1, category: "Suma Living" },
  { name: "Relivin Tea", price: 2844, oldPrice: 3159, category: "Others" },
  { name: "Detoxilive Pro Oil Capsules", price: 3159, oldPrice: 3510, category: "Others" },
  { name: "NTDiarr Pills (1 Dozen)", price: 1895, oldPrice: 2106, category: "Others" },
  { name: "MicrO2 Cycle Tablets", price: 3475, oldPrice: 3861, category: "Heart & Blood Fit" },
  { name: "GluzoJoint-Ultra Pro", price: 8846, oldPrice: 9828, category: "Suma Fit" },
  { name: "Femicalcium D3", price: 5055, oldPrice: 5616, category: "Women's Beauty" },
  { name: "FemiBiotics", price: 6318, oldPrice: 7020, category: "Women's Beauty" },
  { name: "Elements", price: 4739, oldPrice: 5265, category: "Suma Fit" },
];

export const PHONE = "0141612025";
export const PHONE_INTL = "254141612025";
export const WHATSAPP = `https://wa.me/${PHONE_INTL}?text=Hello%20BF%20Suma%2C%20I%27d%20like%20to%20order%20a%20product.`;
