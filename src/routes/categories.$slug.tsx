import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, CATEGORY_IMAGES, PHONE, PRODUCTS, WHATSAPP, slugify, type Category } from "@/lib/products";
import { ArrowLeft, Leaf, Phone, MessageCircle, Check } from "lucide-react";

const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [slugify(c.name), c.name]),
) as Record<string, Category>;

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = CATEGORY_BY_SLUG[params.slug];
    if (!category) throw notFound();
    const items = PRODUCTS.filter((p) => p.category === category);
    const meta = CATEGORIES.find((c) => c.name === category)!;
    return { category, items, blurb: meta.blurb };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category ?? "Category";
    const title = `${c} — BF Suma Kenya`;
    const desc = loaderData?.blurb ?? "Explore BF Suma wellness products.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: CategoryPage,
});

const KSH = (n: number) => `${n.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} KSh`;

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3">
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>
      </div>
    </div>
  );
}

function CategoryPage() {
  const { category, items, blurb } = Route.useLoaderData();
  const heroImg = CATEGORY_IMAGES[category];
  const orderUrl = `${WHATSAPP.split("?")[0]}?text=${encodeURIComponent(`Hello BF Suma, I'd like to know more about ${category} products.`)}`;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-[var(--gradient-leaf)] text-primary-foreground">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">BF Suma <span className="text-muted-foreground font-normal">Kenya</span></span>
          </Link>
          <a href={`tel:${PHONE}`} className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium">
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
          <ArrowLeft className="w-4 h-4" /> All categories
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--leaf)] mb-3">BF Suma collection</p>
          <h1 className="font-display text-5xl md:text-6xl leading-tight">{category}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{blurb}</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm">
            {["Authentic BF Suma", "Delivered across Kenya", "Expert wellness advice", "WhatsApp ordering"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--leaf)]/15 text-[var(--leaf)]">
                  <Check className="w-3 h-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={orderUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium shadow-[var(--shadow-soft)]">
              <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 font-medium hover:bg-secondary transition">
              <Phone className="w-4 h-4" /> Call {PHONE}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-[var(--gradient-botanical)] rounded-[3rem] blur-2xl opacity-70" />
          <div className="relative rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[var(--shadow-bloom)] aspect-[4/3]">
            <img src={heroImg} alt={category} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <h2 className="font-display text-3xl md:text-4xl">Shop {category}</h2>
          <span className="text-sm text-muted-foreground">{items.length} products</span>
        </div>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No products yet in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <article key={p.slug} className="group rounded-3xl bg-card border border-border/60 p-5 shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-bloom)] transition flex flex-col">
                <div className="relative aspect-square rounded-2xl mb-5 overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  {p.oldPrice && (
                    <span className="absolute top-3 right-3 text-[10px] font-semibold bg-[var(--accent)] text-accent-foreground px-2.5 py-1 rounded-full">
                      -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="font-display text-lg font-semibold leading-snug flex-1 hover:text-primary transition">{p.name}</Link>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-primary font-semibold">{KSH(p.price)}</span>
                  {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{KSH(p.oldPrice)}</span>}
                </div>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="mt-4 inline-flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-sm font-medium transition">
                  View details
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl mb-6">Explore other categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.name !== category).map((c) => (
            <Link
              key={c.name}
              to="/categories/$slug"
              params={{ slug: slugify(c.name) }}
              className="rounded-3xl bg-card border border-border/60 p-5 hover:border-primary/40 hover:-translate-y-1 transition"
            >
              <h3 className="font-display text-lg font-semibold">{c.name}</h3>
              <p className="text-xs mt-1 text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 mt-8 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BF Suma Kenya. All rights reserved.
      </footer>
    </div>
  );
}
