import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORY_IMAGES, PHONE, PRODUCTS, WHATSAPP, getProductBySlug, type Product } from "@/lib/products";
import { ArrowLeft, Check, MessageCircle, Phone, Leaf, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — BF Suma Kenya` : "Product — BF Suma Kenya";
    const desc = p ? p.description : "Premium BF Suma supplement.";
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
  component: ProductDetail,
});

const KSH = (n: number) => `${n.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} KSh`;

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <p className="mt-3 text-muted-foreground">It may have been moved or renamed.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3">
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>
      </div>
    </div>
  );
}

function ProductDetail() {
  const { product: p } = Route.useLoaderData();
  const img = CATEGORY_IMAGES[p.category];
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const orderUrl = `${WHATSAPP.split("?")[0]}?text=${encodeURIComponent(`Hello BF Suma, I'd like to order: ${p.name}`)}`;

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
          <ArrowLeft className="w-4 h-4" /> Back to all products
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="absolute -inset-6 bg-[var(--gradient-botanical)] rounded-[3rem] blur-2xl opacity-70" />
          <div className="relative rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[var(--shadow-bloom)] bg-secondary aspect-square">
            <img src={img} alt={p.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-5 right-5 text-xs font-semibold bg-[var(--accent)] text-accent-foreground px-3 py-1.5 rounded-full">
                -{discount}% off
              </span>
            )}
          </div>
        </div>

        <div>
          <Link
            to="/"
            hash={`category-${p.category}`}
            className="inline-block text-xs uppercase tracking-[0.25em] text-[var(--leaf)] mb-3"
          >
            {p.category}
          </Link>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{p.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{p.description}</p>

          <div className="mt-7 flex items-baseline gap-4">
            <span className="text-4xl font-semibold text-primary">{KSH(p.price)}</span>
            {p.oldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{KSH(p.oldPrice)}</span>
                <span className="text-sm font-semibold text-[var(--gold)]">Save {KSH(p.oldPrice - p.price)}</span>
              </>
            )}
          </div>

          <div className="mt-8 rounded-3xl bg-card border border-border/60 p-6">
            <h2 className="font-display text-lg font-semibold mb-3">Key benefits</h2>
            <ul className="space-y-2.5">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--leaf)]/15 text-[var(--leaf)] mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={orderUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium shadow-[var(--shadow-soft)] hover:translate-y-[-1px] transition">
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 font-medium hover:bg-secondary transition">
              <Phone className="w-4 h-4" /> Call {PHONE}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-[var(--leaf)]" />
            Authentic BF Suma product · Delivered across Kenya
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-display text-3xl md:text-4xl mb-8">More from {p.category}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/products/$slug"
                params={{ slug: r.slug }}
                className="group rounded-3xl bg-card border border-border/60 p-4 hover:-translate-y-1 hover:shadow-[var(--shadow-bloom)] transition"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                  <img src={CATEGORY_IMAGES[r.category]} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <h3 className="font-display font-semibold leading-snug">{r.name}</h3>
                <div className="mt-2 text-primary font-semibold">{KSH(r.price)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-border/60 mt-8 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BF Suma Kenya. All rights reserved.
      </footer>
    </div>
  );
}
