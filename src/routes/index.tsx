import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero-botanical.jpg";
import leafSprig from "@/assets/leaf-sprig.png";
import { CATEGORIES, CATEGORY_IMAGES, PHONE, PRODUCTS, WHATSAPP, type Category } from "@/lib/products";
import { Phone, MessageCircle, MapPin, Leaf, Sparkles, ShieldCheck, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BF Suma Kenya — Premium Botanical Health & Wellness" },
      { name: "description", content: "Shop authentic BF Suma supplements in Kenya. Immune, beauty, men's power, kids & more. Call 0141612025 or order on WhatsApp." },
      { property: "og:title", content: "BF Suma Kenya — Botanical Health & Wellness" },
      { property: "og:description", content: "Authentic BF Suma supplements delivered across Kenya." },
    ],
  }),
  component: Index,
});

const KSH = (n: number) => `${n.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} KSh`;

function Index() {
  const [active, setActive] = useState<Category | "All">("All");
  const filtered = useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <Hero />
      <Highlights />
      <Categories active={active} onSelect={setActive} />
      <ProductsGrid items={filtered} active={active} />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-[var(--gradient-leaf)] text-primary-foreground">
            <Leaf className="w-5 h-5" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">BF Suma <span className="text-muted-foreground font-normal">Kenya</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#categories" className="hover:text-primary transition">Categories</a>
          <a href="#products" className="hover:text-primary transition">Products</a>
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </nav>
        <a
          href={`tel:${PHONE}`}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] hover:opacity-90 transition"
        >
          <Phone className="w-4 h-4" /> {PHONE}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-botanical)" }} />
      <img src={leafSprig} alt="" aria-hidden className="absolute -left-8 top-20 w-40 opacity-60 float-slow" />
      <img src={leafSprig} alt="" aria-hidden className="absolute right-10 bottom-10 w-32 opacity-50 float-slow rotate-180" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" /> Botanical wellness, since 2003
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05]">
            Rooted in nature,<br />
            <em className="text-primary not-italic">cultivated</em> for you.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Authentic BF Suma supplements — premium botanical formulas for immunity, beauty, vitality and family health. Delivered across Kenya.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium shadow-[var(--shadow-soft)] hover:translate-y-[-1px] transition">
              Shop products
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 font-medium hover:bg-secondary transition">
              <MessageCircle className="w-4 h-4 text-[var(--leaf)]" /> Order on WhatsApp
            </a>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
            <div><span className="block text-2xl font-display text-foreground">50+</span>Global markets</div>
            <div><span className="block text-2xl font-display text-foreground">100%</span>Natural ingredients</div>
            <div><span className="block text-2xl font-display text-foreground">42</span>Premium products</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-[var(--gradient-botanical)] rounded-[3rem] blur-2xl opacity-70" />
          <img
            src={heroImg}
            alt="BF Suma botanical wellness collection"
            width={1536}
            height={1024}
            className="relative w-full rounded-[2.5rem] shadow-[var(--shadow-bloom)] object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { icon: Leaf, title: "Premium ingredients", text: "Sourced from nature, purified by science." },
    { icon: ShieldCheck, title: "Quality & safety", text: "Tested for potency and purity, batch by batch." },
    { icon: HeartPulse, title: "For every goal", text: "Immunity, beauty, vitality, focus — covered." },
    { icon: Sparkles, title: "Start a business", text: "Become a BF Suma distributor in Kenya." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-5">
      {items.map((it) => (
        <div key={it.title} className="rounded-3xl bg-card border border-border/60 p-6 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition">
          <span className="grid place-items-center w-12 h-12 rounded-2xl bg-secondary text-primary mb-4">
            <it.icon className="w-5 h-5" />
          </span>
          <h3 className="font-display text-xl font-semibold">{it.title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5">{it.text}</p>
        </div>
      ))}
    </section>
  );
}

function Categories({ active, onSelect }: { active: Category | "All"; onSelect: (c: Category | "All") => void }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">The collection</p>
          <h2 className="font-display text-4xl md:text-5xl">Shop by category</h2>
        </div>
        <button
          onClick={() => onSelect("All")}
          className={`rounded-full px-5 py-2 text-sm border transition ${active === "All" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((c, i) => {
          const isActive = active === c.name;
          return (
            <button
              key={c.name}
              onClick={() => onSelect(c.name)}
              className={`group text-left rounded-3xl p-5 border transition relative overflow-hidden ${
                isActive ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/60 hover:border-primary/40"
              }`}
            >
              <Leaf className={`absolute -right-3 -bottom-3 w-20 h-20 opacity-10 group-hover:opacity-20 transition ${isActive ? "text-primary-foreground" : "text-[var(--leaf)]"}`} />
              <span className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>0{i + 1}</span>
              <h3 className="font-display text-lg font-semibold mt-1">{c.name}</h3>
              <p className={`text-xs mt-1 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.blurb}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ProductsGrid({ items, active }: { items: typeof PRODUCTS; active: Category | "All" }) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">{active === "All" ? "All products" : active}</p>
          <h2 className="font-display text-4xl md:text-5xl">Featured wellness</h2>
        </div>
        <span className="text-sm text-muted-foreground">{items.length} products</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((p) => (
          <article key={p.name} className="group rounded-3xl bg-card border border-border/60 p-5 shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-bloom)] transition flex flex-col">
            <div className="relative aspect-square rounded-2xl mb-5 overflow-hidden bg-secondary">
              <img
                src={CATEGORY_IMAGES[p.category]}
                alt={p.name}
                width={768}
                height={768}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-background/85 backdrop-blur px-2.5 py-1 rounded-full">{p.category}</span>
              {p.oldPrice && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold bg-[var(--accent)] text-accent-foreground px-2.5 py-1 rounded-full">
                  -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <h3 className="font-display text-lg font-semibold leading-snug flex-1">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xl font-semibold text-primary">{KSH(p.price)}</span>
              {p.oldPrice && <span className="text-sm text-muted-foreground line-through">{KSH(p.oldPrice)}</span>}
            </div>
            <a
              href={`${WHATSAPP.split("?")[0]}?text=${encodeURIComponent(`Hello BF Suma, I'd like to order: ${p.name}`)}`}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              <MessageCircle className="w-4 h-4" /> Order
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 mt-12">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-botanical)", opacity: 0.5 }} />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          <Leaf className="w-3.5 h-3.5 text-[var(--leaf)]" /> About BF Suma
        </span>
        <h2 className="font-display text-4xl md:text-5xl">Supplements for every need</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Founded in Los Angeles, BF Suma develops a premium range of botanical health and wellness products trusted in over 50 markets worldwide. From functional beverages to specialty supplements, every formula is crafted with the highest quality natural ingredients and backed by science.
        </p>
        <p className="mt-4 text-muted-foreground">
          Your wellness transformation is just a supplement away.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl">Start your wellness journey</h2>
          <p className="mt-5 text-muted-foreground">Call us, message on WhatsApp, or visit our Nairobi office. We deliver across Kenya.</p>

          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary text-primary"><Phone className="w-5 h-5" /></span>
              <div><div className="text-xs text-muted-foreground">Call us</div><div className="font-semibold text-lg">{PHONE}</div></div>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-[var(--leaf)] text-primary-foreground"><MessageCircle className="w-5 h-5" /></span>
              <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-semibold text-lg">Chat with us</div></div>
            </a>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary text-primary"><MapPin className="w-5 h-5" /></span>
              <div><div className="text-xs text-muted-foreground">Visit us</div><div className="font-semibold">P.O Box 54059 — 00200, Nairobi, Kenya</div></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-[var(--gradient-botanical)] rounded-[3rem] blur-2xl opacity-70" />
          <div className="relative rounded-[2.5rem] bg-card border border-border/60 p-10 shadow-[var(--shadow-bloom)]">
            <img src={leafSprig} alt="" aria-hidden className="w-16 mb-4 float-slow" />
            <h3 className="font-display text-3xl">Become a distributor</h3>
            <p className="mt-3 text-muted-foreground">Own your own business with BF Suma. Earn from a global wellness brand trusted in 50+ markets.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium">
              <MessageCircle className="w-4 h-4" /> Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-[var(--leaf)]" />
            <span className="font-display text-xl font-semibold">BF Suma Kenya</span>
          </div>
          <p className="text-muted-foreground">Premium botanical health & wellness products, trusted across Kenya and 50+ global markets.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href={`tel:${PHONE}`} className="hover:text-primary">{PHONE}</a></li>
            <li><a href={WHATSAPP} target="_blank" rel="noopener" className="hover:text-primary">WhatsApp us</a></li>
            <li>P.O Box 54059 — 00200, Nairobi</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Disclaimer</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">This site does not provide medical advice. Always consult a healthcare professional and follow product labeling.</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} BF Suma Kenya. All rights reserved.</div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid place-items-center w-14 h-14 rounded-full bg-[var(--leaf)] text-primary-foreground shadow-[var(--shadow-bloom)] hover:scale-110 transition"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
