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
  // Immune Booster
  { name: "BF Suma Pure & Broken Ganoderma Spores", price: 9396, category: "Immune Booster",
    description: "Premium broken-wall ganoderma spores concentrating immune-supporting nutrients.",
    benefits: ["Powerful immune support", "Rich in triterpenes", "Adaptogenic"] },
  { name: "NMN-Duo Release", price: 24165, category: "Immune Booster",
    description: "Advanced NMN dual-release formula supporting cellular energy and longevity.",
    benefits: ["Cellular energy", "Longevity support", "Dual-release tech"] },
  { name: "Pure & Broken Ganoderma Spores 60's", price: 17820, category: "Immune Booster",
    description: "60-capsule pack of premium broken-wall ganoderma spores for daily immune resilience.",
    benefits: ["Daily immune defense", "60-day supply", "Pharma-grade purity"] },
  { name: "NMN-Sharp Mind", price: 25920, category: "Immune Booster",
    description: "NMN formulation targeting cognitive sharpness, focus and brain energy.",
    benefits: ["Mental sharpness", "Focus & clarity", "Brain energy"] },
  { name: "Pure & Broken Ganoderma Spores", price: 17820, category: "Immune Booster",
    description: "Premium broken-wall ganoderma spore capsules for total immune wellness.",
    benefits: ["Immune resilience", "Antioxidant rich", "Daily vitality"] },
  { name: "Ntdiarr Pills 50's", price: 486, category: "Immune Booster",
    description: "Herbal pills (50's) for fast relief of digestive upsets.",
    benefits: ["Fast acting", "Digestive comfort", "50-pill pack"] },
  { name: "Pure Broken Ganoderma Spores Oil Capsules", price: 20736, category: "Immune Booster",
    description: "Ultra-concentrated ganoderma spore oil — the most potent form for elite immune support.",
    benefits: ["Most concentrated form", "Premium immunity", "Cellular wellness"] },
  { name: "Refined Yunzhi Essence", price: 4698, category: "Immune Booster",
    description: "Traditional Yunzhi mushroom essence formulated for immune resilience.",
    benefits: ["Immune resilience", "Traditional botanical", "Daily vitality"] },
  { name: "Quad-Reishi Capsules", price: 5670, category: "Immune Booster",
    description: "Potent reishi complex supporting immunity, sleep and stress balance.",
    benefits: ["Immune support", "Stress balance", "Restful sleep"] },
  { name: "Ntdiarr Pills", price: 162, category: "Immune Booster",
    description: "Pocket-size herbal pills for quick digestive relief on the go.",
    benefits: ["Pocket size", "Fast relief", "Herbal"] },
  { name: "Sleep Beauty", price: 2592, category: "Immune Booster",
    description: "Calming nighttime formula that promotes restful sleep and overnight recovery.",
    benefits: ["Restful sleep", "Overnight recovery", "Calming blend"] },

  // Heart & Blood Fit (Cardiovascular)
  { name: "Detoxilive Pro Oil Capsules", price: 3240, category: "Heart & Blood Fit",
    description: "Liver-loving oil capsules formulated to support natural detox and circulation.",
    benefits: ["Liver support", "Natural detox", "Cardio wellness"] },
  { name: "Detoxilive Capsules", price: 2430, category: "Heart & Blood Fit",
    description: "Daily detox capsules supporting liver, blood purification and circulation.",
    benefits: ["Daily detox", "Blood purification", "Liver care"] },
  { name: "Micro2 Cycle Tablets", price: 3564, category: "Heart & Blood Fit",
    description: "Supports healthy circulation and oxygen delivery for an energized heart and body.",
    benefits: ["Healthy circulation", "Oxygen support", "Cardio wellness"] },
  { name: "GymEffect", price: 3240, category: "Heart & Blood Fit",
    description: "Botanical blend supporting cardio output, endurance and recovery.",
    benefits: ["Cardio output", "Endurance", "Faster recovery"] },
  { name: "CereBrain", price: 4050, category: "Heart & Blood Fit",
    description: "Brain & circulation support with DHA and botanicals for focus and memory.",
    benefits: ["Focus & memory", "DHA for brain", "Healthy circulation"] },
  { name: "Reliving Tea", price: 2916, category: "Heart & Blood Fit",
    description: "Calming herbal infusion to ease tension and support cardiovascular comfort.",
    benefits: ["Eases tension", "Promotes calm", "Caffeine-free"] },

  // Suma Fit
  { name: "Ez-Xlim", price: 8424, category: "Suma Fit",
    description: "Natural weight-management formula that supports metabolism and curbs cravings.",
    benefits: ["Supports metabolism", "Curbs appetite", "Natural ingredients"] },
  { name: "Veggie Veggie", price: 4860, category: "Suma Fit",
    description: "Tasty greens blend delivering essential vitamins, minerals and fiber daily.",
    benefits: ["Daily greens", "Vitamins & minerals", "Great taste"] },
  { name: "Elements", price: 4860, category: "Suma Fit",
    description: "Complete multi-nutrient blend covering daily essentials for whole-body wellness.",
    benefits: ["Complete daily blend", "Whole-body wellness", "Essential nutrients"] },
  { name: "Probio3 (Strawberry Flavor) 30's", price: 4860, category: "Suma Fit",
    description: "Multi-strain probiotic in a delicious strawberry flavor for gut & immune health.",
    benefits: ["Balances gut flora", "Strengthens immunity", "Kid-friendly flavor"] },
  { name: "Novel Depile Capsules", price: 3564, category: "Suma Fit",
    description: "Specialty botanical formula crafted for targeted wellness support.",
    benefits: ["Botanical formula", "Targeted support", "Easy to take"] },
  { name: "ConstiRelax Oral Solution", price: 4698, category: "Suma Fit",
    description: "Gentle herbal oral solution to relieve constipation and support digestion.",
    benefits: ["Gentle relief", "Supports regularity", "Herbal blend"] },

  // Men's Power
  { name: "ProstatRelax Capsules", price: 3888, category: "Men's Power",
    description: "Botanical formula crafted to support prostate health and urinary comfort.",
    benefits: ["Supports prostate function", "Healthy urinary flow", "Natural ingredients"] },
  { name: "X Power Man Capsules - New", price: 6804, category: "Men's Power",
    description: "Premium men's vitality formula combining maca, ginseng and tribulus for stamina.",
    benefits: ["Boosts stamina", "Supports vitality", "Performance support"] },

  // Smart Kids
  { name: "Blueberry Chewable Tablets for Sharp Vision", price: 3888, category: "Smart Kids",
    description: "Blueberry-flavored chewables packed with antioxidants for sharp vision.",
    benefits: ["Supports eye health", "Rich in antioxidants", "Kid-loved flavor"] },
  { name: "Calcium & Vitamin D3 Milk Tablets (Strawberry Flavour)", price: 3888, category: "Smart Kids",
    description: "Strawberry milk tablets delivering calcium and D3 for strong bones and teeth.",
    benefits: ["Strong bones & teeth", "Calcium + D3", "Strawberry flavor"] },
  { name: "Vitamin C Chewable Tablets", price: 3240, category: "Smart Kids",
    description: "Tangy vitamin C chewables to support immunity and daily wellness.",
    benefits: ["Immune support", "Antioxidant", "Tasty chewable"] },

  // Women's Beauty
  { name: "Femicalcium D3", price: 5184, category: "Women's Beauty",
    description: "Calcium with D3 for women — strong bones, healthy nails and lifelong support.",
    benefits: ["Strong bones", "Healthy nails", "Daily calcium"] },
  { name: "FemiBiotics", price: 6480, category: "Women's Beauty",
    description: "Targeted probiotic blend supporting women's intimate and digestive health.",
    benefits: ["Feminine balance", "Digestive support", "Targeted probiotics"] },
  { name: "Youth Essence Facial Cream", price: 5508, category: "Women's Beauty",
    description: "Luxurious facial cream infused with botanicals to smooth, firm and hydrate.",
    benefits: ["Deep hydration", "Smooths fine lines", "Radiant glow"] },
  { name: "Youth Essence Facial Mask", price: 2916, category: "Women's Beauty",
    description: "Soothing botanical mask that revives tired skin and restores luminosity.",
    benefits: ["Revives skin", "Hydrates deeply", "Adds glow"] },
  { name: "Youth Essence Toner", price: 4374, category: "Women's Beauty",
    description: "Refreshing toner that balances skin and preps it for moisture absorption.",
    benefits: ["Balances pH", "Refines pores", "Preps skin"] },
  { name: "Youth Essence Lotion", price: 4050, category: "Women's Beauty",
    description: "Lightweight lotion that locks in moisture and leaves skin supple all day.",
    benefits: ["All-day hydration", "Lightweight feel", "Soft, supple skin"] },
  { name: "Youth Refreshing Facial Cleanser", price: 3564, category: "Women's Beauty",
    description: "Gentle daily cleanser that removes impurities while protecting the skin barrier.",
    benefits: ["Gentle cleansing", "Removes impurities", "Protects barrier"] },
  { name: "Youth Ever", price: 16065, category: "Women's Beauty",
    description: "Advanced anti-aging system for visible firmness, glow and youthful skin.",
    benefits: ["Anti-aging", "Firms & lifts", "Youthful glow"] },
  { name: "Feminergy Capsules", price: 4860, category: "Women's Beauty",
    description: "Targeted nutrition for women — hormonal balance, mood and daily energy.",
    benefits: ["Hormonal balance", "Mood support", "Sustained energy"] },
  { name: "FemiVitamin Tablets", price: 4860, category: "Women's Beauty",
    description: "Daily multivitamin tablets formulated for women's complete wellness.",
    benefits: ["Daily essentials", "Women's wellness", "Energy support"] },
  { name: "FemiCare (Feminine Cleanser)", price: 1782, category: "Women's Beauty",
    description: "Gentle pH-balanced intimate cleanser with botanical extracts for daily freshness.",
    benefits: ["pH balanced", "Soothing botanicals", "Daily freshness"] },

  // Sport Fit
  { name: "ArthroXtra Tablets", price: 6318, category: "Sport Fit",
    description: "Advanced joint formula with glucosamine, chondroitin and herbs for mobility.",
    benefits: ["Joint comfort", "Improved mobility", "Cartilage support"] },
  { name: "GluzoJoint-F Capsules", price: 4423, category: "Sport Fit",
    description: "Glucosamine-based formula for joint flexibility and everyday comfort.",
    benefits: ["Joint flexibility", "Comfort & ease", "Daily support"] },
  { name: "GluzoJoint-Ultra Pro", price: 8846, category: "Sport Fit",
    description: "Pro-strength joint formula for active adults seeking max comfort and mobility.",
    benefits: ["Pro-strength relief", "Active mobility", "Long-term comfort"] },
  { name: "ZaminoCal Plus Capsules", price: 3633, category: "Sport Fit",
    description: "Calcium and amino acid blend supporting bones, muscles and recovery.",
    benefits: ["Bone strength", "Muscle support", "Faster recovery"] },

  // Suma Living
  { name: "X Power Coffee", price: 2370, category: "Suma Living",
    description: "Functional coffee infused with maca and tongkat ali for sustained energy.",
    benefits: ["All-day energy", "Supports performance", "Smooth taste"] },
  { name: "4 in 1 Cordyceps Coffee", price: 2054, category: "Suma Living",
    description: "Smooth coffee blended with cordyceps for clean energy, focus and endurance.",
    benefits: ["Clean energy", "Endurance", "Smooth taste"] },
  { name: "4-in-1 Ginseng Coffee", price: 2054, category: "Suma Living",
    description: "Premium coffee enhanced with ginseng for vitality and mental clarity.",
    benefits: ["Boosts vitality", "Mental clarity", "Rich aroma"] },
  { name: "4-in-1 Reishi Coffee", price: 2054, category: "Suma Living",
    description: "Calming coffee infused with reishi for balanced energy and immune support.",
    benefits: ["Balanced energy", "Immune support", "Calming finish"] },
  { name: "Dr. Ts Toothpaste", price: 869, category: "Suma Living",
    description: "Herbal toothpaste that protects gums, freshens breath and whitens naturally.",
    benefits: ["Gum protection", "Fresh breath", "Natural whitening"] },
  { name: "Coolroll (1 Dozen)", price: 1896, category: "Suma Living",
    description: "Refreshing herbal rollerball for headaches, dizziness and on-the-go relief.",
    benefits: ["Cooling relief", "On-the-go", "Herbal blend"] },
  { name: "Anatic Herbal Essence Soap", price: 348, category: "Suma Living",
    description: "Gentle herbal cleansing bar that soothes and refreshes skin daily.",
    benefits: ["Gentle cleanse", "Herbal soothing", "Daily refresh"] },

  // Others
  { name: "NTDiarr Pills (1 Dozen)", price: 1895, category: "Others",
    description: "Fast-acting herbal pills to settle digestive upsets — 1 dozen pack.",
    benefits: ["Fast acting", "Digestive comfort", "Pocket size"] },
];

export const PRODUCTS: Product[] = SEED.map((p) => ({ ...p, slug: slugify(p.name) }));

export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const PHONE = "0141612025";
export const PHONE_INTL = "254141612025";
export const WHATSAPP = `https://wa.me/${PHONE_INTL}?text=Hello%20BF%20Suma%2C%20I%27d%20like%20to%20order%20a%20product.`;
