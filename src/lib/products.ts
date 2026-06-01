import immuneImg from "@/assets/products/immune.jpg";
import sportImg from "@/assets/products/sport.jpg";
import heartImg from "@/assets/products/heart.jpg";
import fitImg from "@/assets/products/fit.jpg";
import menImg from "@/assets/products/men.jpg";
import kidsImg from "@/assets/products/kids.jpg";
import womenImg from "@/assets/products/women.jpg";
import livingImg from "@/assets/products/living.jpg";
import othersImg from "@/assets/products/others.jpg";

export type Product = {
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
  slug: string;
  description: string;
  benefits: string[];
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

export const CATEGORY_IMAGES: Record<Category, string> = {
  "Immune Booster": immuneImg,
  "Sport Fit": sportImg,
  "Heart & Blood Fit": heartImg,
  "Suma Fit": fitImg,
  "Men's Power": menImg,
  "Smart Kids": kidsImg,
  "Women's Beauty": womenImg,
  "Suma Living": livingImg,
  "Others": othersImg,
};

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

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

type Seed = { name: string; price: number; oldPrice?: number; category: Category; description: string; benefits: string[] };

const SEED: Seed[] = [
  { name: "X Power Man Plus Capsules", price: 6634, oldPrice: 7371, category: "Men's Power",
    description: "A premium men's vitality formula combining maca, ginseng and tribulus to support stamina, performance and confidence.",
    benefits: ["Boosts stamina & endurance", "Supports healthy testosterone", "Enhances vitality"] },
  { name: "X Power Coffee", price: 2370, oldPrice: 2632.5, category: "Men's Power",
    description: "A rich functional coffee infused with maca and tongkat ali for sustained energy and male vitality.",
    benefits: ["All-day energy", "Supports performance", "Smooth, premium taste"] },
  { name: "ProstatRelax Capsules", price: 3791, oldPrice: 4212, category: "Men's Power",
    description: "A botanical formula crafted to support prostate health, urinary flow and comfort for men.",
    benefits: ["Supports prostate function", "Promotes healthy urinary flow", "Natural ingredients"] },
  { name: "Feminergy Capsules", price: 4739, oldPrice: 5265, category: "Women's Beauty",
    description: "Targeted nutrition for women — supports hormonal balance, mood and daily energy.",
    benefits: ["Hormonal balance", "Mood support", "Sustained energy"] },
  { name: "FemiCare (Feminine Cleanser)", price: 1738, oldPrice: 1930.5, category: "Women's Beauty",
    description: "A gentle pH-balanced intimate cleanser with botanical extracts for daily freshness.",
    benefits: ["pH balanced", "Soothing botanicals", "Daily freshness"] },
  { name: "GymEffect", price: 3159, oldPrice: 3510, category: "Sport Fit",
    description: "Pre-workout botanical blend to fuel training, sharpen focus and speed up recovery.",
    benefits: ["Boosts training output", "Faster recovery", "Sharp focus"] },
  { name: "Dr. Ts Toothpaste", price: 869, oldPrice: 965.25, category: "Suma Living",
    description: "Herbal toothpaste that protects gums, freshens breath and whitens naturally.",
    benefits: ["Gum protection", "Fresh breath", "Natural whitening"] },
  { name: "Probio3 (Strawberry) 30's", price: 4815, oldPrice: 5350, category: "Immune Booster",
    description: "A multi-strain probiotic in a delicious strawberry flavor to support gut and immune health.",
    benefits: ["Balances gut flora", "Strengthens immunity", "Kid-friendly flavor"] },
  { name: "ConstiRelax Oral Solution", price: 4581, oldPrice: 5089.5, category: "Others",
    description: "A gentle herbal oral solution to relieve occasional constipation and support comfortable digestion.",
    benefits: ["Gentle relief", "Supports regularity", "Herbal blend"] },
  { name: "Pure & Broken Ganoderma Spores (30's)", price: 9162, oldPrice: 10179, category: "Immune Booster",
    description: "Premium broken-wall ganoderma spores — concentrated immune-supporting nutrients in every capsule.",
    benefits: ["Powerful immune support", "Rich in triterpenes", "Adaptogenic"] },
  { name: "Pure & Broken Ganoderma Spores (60's)", price: 17375, oldPrice: 19305, category: "Immune Booster",
    description: "Double-size pack of premium broken-wall ganoderma spores for daily immune resilience.",
    benefits: ["Daily immune defense", "60-day supply", "Pharma-grade purity"] },
  { name: "Ez-Xlim", price: 8214, oldPrice: 9126, category: "Suma Fit",
    description: "A natural weight-management formula that supports metabolism and curbs cravings.",
    benefits: ["Supports metabolism", "Curbs appetite", "Natural ingredients"] },
  { name: "Veggie Veggie", price: 4739, oldPrice: 5265, category: "Smart Kids",
    description: "A tasty greens blend that helps kids get essential vitamins, minerals and fiber daily.",
    benefits: ["Daily greens for kids", "Vitamins & minerals", "Great taste"] },
  { name: "Blueberry Chewable Tablets", price: 3791, oldPrice: 4212, category: "Smart Kids",
    description: "Blueberry-flavored chewables packed with antioxidants to support sharp vision and eye health.",
    benefits: ["Supports eye health", "Rich in antioxidants", "Kid-loved flavor"] },
  { name: "Calcium & Vitamin D3 Milk Tablets", price: 3791, oldPrice: 4212, category: "Smart Kids",
    description: "Strawberry-flavored milk tablets delivering calcium and D3 for strong bones and teeth.",
    benefits: ["Strong bones & teeth", "Calcium + D3", "Strawberry flavor"] },
  { name: "Vitamin C Chewable Tablets", price: 3159, oldPrice: 3510, category: "Smart Kids",
    description: "Tangy vitamin C chewables to support immunity and daily wellness for the whole family.",
    benefits: ["Immune support", "Antioxidant", "Tasty chewable"] },
  { name: "Ganoderma Spores Oil Capsules (60's)", price: 20218, oldPrice: 22464, category: "Immune Booster",
    description: "Ultra-concentrated ganoderma spore oil — the most potent form for elite immune support.",
    benefits: ["Most concentrated form", "Premium immunity", "Cellular wellness"] },
  { name: "Youth Essence Facial Cream", price: 5371, oldPrice: 5967, category: "Women's Beauty",
    description: "A luxurious facial cream infused with botanicals to smooth, firm and hydrate skin.",
    benefits: ["Deep hydration", "Smooths fine lines", "Radiant glow"] },
  { name: "Youth Essence Facial Mask", price: 2844, oldPrice: 3159, category: "Women's Beauty",
    description: "A soothing botanical mask that revives tired skin and restores luminosity.",
    benefits: ["Revives skin", "Hydrates deeply", "Adds glow"] },
  { name: "Youth Essence Toner", price: 4265, oldPrice: 4738, category: "Women's Beauty",
    description: "A refreshing toner that balances skin and preps it for moisture absorption.",
    benefits: ["Balances pH", "Refines pores", "Preps skin"] },
  { name: "Youth Essence Lotion", price: 3949, oldPrice: 4387, category: "Women's Beauty",
    description: "A lightweight lotion that locks in moisture and leaves skin supple all day.",
    benefits: ["All-day hydration", "Lightweight feel", "Soft, supple skin"] },
  { name: "Youth Refreshing Facial Cleanser", price: 3475, oldPrice: 3861, category: "Women's Beauty",
    description: "A gentle daily cleanser that removes impurities while protecting the skin barrier.",
    benefits: ["Gentle cleansing", "Removes impurities", "Protects barrier"] },
  { name: "Refined Yunzhi Essence", price: 4581, oldPrice: 5089.5, category: "Immune Booster",
    description: "A traditional Yunzhi mushroom essence formulated for immune resilience and vitality.",
    benefits: ["Immune resilience", "Traditional botanical", "Daily vitality"] },
  { name: "4 in 1 Cordyceps Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living",
    description: "Smooth coffee blended with cordyceps for clean energy, focus and endurance.",
    benefits: ["Clean energy", "Endurance", "Smooth taste"] },
  { name: "4-in-1 Ginseng Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living",
    description: "Premium coffee enhanced with ginseng for vitality and mental clarity.",
    benefits: ["Boosts vitality", "Mental clarity", "Rich aroma"] },
  { name: "4-in-1 Reishi Coffee", price: 2054, oldPrice: 2281.5, category: "Suma Living",
    description: "A calming coffee infused with reishi for balanced energy and immune support.",
    benefits: ["Balanced energy", "Immune support", "Calming finish"] },
  { name: "Quad-Reishi Capsules", price: 5529, oldPrice: 6142.5, category: "Immune Booster",
    description: "A potent reishi mushroom complex that supports immunity, sleep and stress balance.",
    benefits: ["Immune support", "Stress balance", "Restful sleep"] },
  { name: "Coolroll (1 Dozen)", price: 1896, oldPrice: 2106, category: "Suma Living",
    description: "Refreshing herbal rollerball for headaches, dizziness and on-the-go relief.",
    benefits: ["Cooling relief", "On-the-go", "Herbal blend"] },
  { name: "ArthroXtra Tablets", price: 6318, oldPrice: 7020, category: "Suma Fit",
    description: "Advanced joint formula combining glucosamine, chondroitin and herbs for mobility and comfort.",
    benefits: ["Joint comfort", "Improved mobility", "Cartilage support"] },
  { name: "Novel Depile Capsules", price: 3475, oldPrice: 3861, category: "Others",
    description: "A specialty botanical formula crafted for targeted wellness support.",
    benefits: ["Botanical formula", "Targeted support", "Easy to take"] },
  { name: "GluzoJoint-F Capsules", price: 4423, oldPrice: 4914, category: "Suma Fit",
    description: "Glucosamine-based formula for joint flexibility and everyday comfort.",
    benefits: ["Joint flexibility", "Comfort & ease", "Daily support"] },
  { name: "CereBrain", price: 3949, oldPrice: 4387.5, category: "Smart Kids",
    description: "Brain support formula with DHA and botanicals for focus, memory and learning.",
    benefits: ["Focus & memory", "DHA for brain", "Learning support"] },
  { name: "ZaminoCal Plus Capsules", price: 3633, oldPrice: 4036, category: "Suma Fit",
    description: "Calcium and amino acid blend that supports bones, muscles and overall recovery.",
    benefits: ["Bone strength", "Muscle support", "Faster recovery"] },
  { name: "Anatic Herbal Essence Soap", price: 348, oldPrice: 386.1, category: "Suma Living",
    description: "A gentle herbal cleansing bar that soothes and refreshes skin daily.",
    benefits: ["Gentle cleanse", "Herbal soothing", "Daily refresh"] },
  { name: "Relivin Tea", price: 2844, oldPrice: 3159, category: "Others",
    description: "A calming herbal infusion to ease tension and restore everyday balance.",
    benefits: ["Eases tension", "Promotes calm", "Caffeine-free"] },
  { name: "Detoxilive Pro Oil Capsules", price: 3159, oldPrice: 3510, category: "Others",
    description: "Liver-loving oil capsules formulated to support natural detox pathways.",
    benefits: ["Liver support", "Natural detox", "Daily wellness"] },
  { name: "NTDiarr Pills (1 Dozen)", price: 1895, oldPrice: 2106, category: "Others",
    description: "Fast-acting herbal pills to settle digestive upsets when life happens.",
    benefits: ["Fast acting", "Digestive comfort", "Pocket size"] },
  { name: "MicrO2 Cycle Tablets", price: 3475, oldPrice: 3861, category: "Heart & Blood Fit",
    description: "Supports healthy circulation and oxygen delivery for an energized heart and body.",
    benefits: ["Healthy circulation", "Oxygen support", "Cardio wellness"] },
  { name: "GluzoJoint-Ultra Pro", price: 8846, oldPrice: 9828, category: "Suma Fit",
    description: "Pro-strength joint formula for active adults seeking maximum comfort and mobility.",
    benefits: ["Pro-strength relief", "Active mobility", "Long-term comfort"] },
  { name: "Femicalcium D3", price: 5055, oldPrice: 5616, category: "Women's Beauty",
    description: "Calcium with D3 for women — strong bones, healthy nails and lifelong support.",
    benefits: ["Strong bones", "Healthy nails", "Daily calcium"] },
  { name: "FemiBiotics", price: 6318, oldPrice: 7020, category: "Women's Beauty",
    description: "Targeted probiotic blend supporting women's intimate and digestive health.",
    benefits: ["Feminine balance", "Digestive support", "Targeted probiotics"] },
  { name: "Elements", price: 4739, oldPrice: 5265, category: "Suma Fit",
    description: "A complete multi-nutrient blend covering daily essentials for whole-body wellness.",
    benefits: ["Complete daily blend", "Whole-body wellness", "Essential nutrients"] },
];

export const PRODUCTS: Product[] = SEED.map((p) => ({ ...p, slug: slugify(p.name) }));

export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const PHONE = "0141612025";
export const PHONE_INTL = "254141612025";
export const WHATSAPP = `https://wa.me/${PHONE_INTL}?text=Hello%20BF%20Suma%2C%20I%27d%20like%20to%20order%20a%20product.`;
