import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  staticFile,
  Img,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadFont2 } from "@remotion/google-fonts/Inter";
import { loadFont as loadFont3 } from "@remotion/google-fonts/CormorantGaramond";

const { fontFamily: playfair } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});
const { fontFamily: inter } = loadFont2("normal", {
  weights: ["300", "400", "600", "800"],
  subsets: ["latin"],
});
const { fontFamily: cormorant } = loadFont3("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export type Benefit = { text: string; sub: string; icon: string };

export type Palette = {
  deep: string;
  mid: string;
  bright: string;
  pale: string;
  ice: string;
  gold: string;
  goldLight: string;
  cream: string;
};

export type VideoProps = {
  image: string;
  brandTag: string;
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  topLabel: string;
  benefits: Benefit[];
  importanceLines: string[];
  unitLabel: string;
  price: string;
  palette: Palette;
  bgScene1: string;
  bgScene2: string;
  bgScene3: string;
};

const ARTHRO_PALETTE: Palette = {
  deep: "#0e2a1a",
  mid: "#14512e",
  bright: "#2f8d4d",
  pale: "#d8f0d8",
  ice: "#e7f7e1",
  gold: "#d4af37",
  goldLight: "#f4d97a",
  cream: "#fff7e3",
};

const ZAMINO_PALETTE: Palette = {
  deep: "#3a1a0a",
  mid: "#7a2e10",
  bright: "#d4671c",
  pale: "#ffe9c9",
  ice: "#fff2dc",
  gold: "#f1c34a",
  goldLight: "#ffe48a",
  cream: "#fffaf0",
};

export const ARTHRO_PROPS: VideoProps = {
  image: "images/arthroxtra.jpg",
  brandTag: "BF SUMA · SPORT FIT",
  titleLine1: "Arthro",
  titleLine2: "Xtra",
  tagline: "✦ Move freely. Live fully. ✦",
  topLabel: "✦ Joint & Bone Support ✦",
  benefits: [
    { text: "Joint Comfort", sub: "Eases stiffness", icon: "✦" },
    { text: "Cartilage Care", sub: "Glucosamine + MSM", icon: "✿" },
    { text: "Mobility Boost", sub: "Move with ease", icon: "❉" },
    { text: "Active Lifestyle", sub: "For every age", icon: "❀" },
  ],
  importanceLines: [
    "Sore knees, slowing down?",
    "Rebuild and protect your joints.",
    "A daily essential for active living.",
  ],
  unitLabel: "60 Tablets · Only",
  price: "6,318",
  palette: ARTHRO_PALETTE,
  bgScene1:
    "radial-gradient(circle at 30% 15%, #14512e 0%, #0e2a1a 45%, #06160d 100%)",
  bgScene2:
    "linear-gradient(180deg, #eaf8ea 0%, #b8e0bb 35%, #4a9a5c 75%, #14512e 100%)",
  bgScene3:
    "radial-gradient(ellipse at 50% 30%, #14512e 0%, #0e2a1a 55%, #06160d 100%)",
};

export const ZAMINO_PROPS: VideoProps = {
  image: "images/zaminocal.jpg",
  brandTag: "BF SUMA · SPORT FIT",
  titleLine1: "Zamino",
  titleLine2: "Cal Plus",
  tagline: "✦ Strong bones, steady steps ✦",
  topLabel: "✦ Calcium · Amino · Vitamin D ✦",
  benefits: [
    { text: "Stronger Bones", sub: "Calcium + Vit D", icon: "✦" },
    { text: "Healthy Teeth", sub: "Daily mineral boost", icon: "✿" },
    { text: "Muscle Function", sub: "Amino-acid blend", icon: "❉" },
    { text: "Anti-Cramps", sub: "Better recovery", icon: "❀" },
  ],
  importanceLines: [
    "Brittle bones? Muscle cramps?",
    "Fuel your frame, the smart way.",
    "Built for growing kids and busy adults.",
  ],
  unitLabel: "100 Capsules · Only",
  price: "3,633",
  palette: ZAMINO_PALETTE,
  bgScene1:
    "radial-gradient(circle at 30% 15%, #7a2e10 0%, #3a1a0a 45%, #1f0c04 100%)",
  bgScene2:
    "linear-gradient(180deg, #fff4e0 0%, #ffd9a6 35%, #d4671c 75%, #7a2e10 100%)",
  bgScene3:
    "radial-gradient(ellipse at 50% 30%, #7a2e10 0%, #3a1a0a 55%, #1f0c04 100%)",
};

/* === Particles === */
function Mist({ frame, count = 24, color }: { frame: number; count?: number; color: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 127.3;
        const x = (seed * 11) % 1080;
        const speed = 0.4 + ((i % 5) * 0.2);
        const y = ((frame * speed * 6) + seed * 3) % 2400 - 200;
        const sway = Math.sin((frame + i * 19) * 0.04) * 60;
        const size = 14 + (i % 4) * 10;
        const op = 0.25 + (i % 3) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}, transparent 70%)`,
              opacity: op,
              filter: "blur(2px)",
            }}
          />
        );
      })}
    </>
  );
}

function GoldSparkles({ frame, count = 30, gold, ice }: { frame: number; count?: number; gold: string; ice: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 91.7;
        const x = (seed * 13) % 1080;
        const y = (seed * 29) % 1920;
        const phase = (frame * 0.07 + i * 0.7) % (Math.PI * 2);
        const tw = (Math.sin(phase) + 1) / 2;
        const size = 3 + (i % 4) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 === 0 ? ice : gold,
              boxShadow: i % 3 === 0
                ? `0 0 12px 2px ${ice}`
                : `0 0 12px 2px ${gold}`,
              opacity: tw,
            }}
          />
        );
      })}
    </>
  );
}

/* === Scene 1 === */
function Scene1({ p }: { p: VideoProps }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = p.palette;

  const brandOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 110 } });
  const subOp = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [30, 70], [0, 340], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: p.bgScene1 }}>
      <GoldSparkles frame={frame} count={32} gold={C.goldLight} ice={C.pale} />
      <Mist frame={frame} count={18} color={C.pale} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 80%, ${C.gold}48 0%, transparent 55%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 60px", zIndex: 5,
      }}>
        <div style={{ opacity: brandOp, transform: `translateY(${brandY}px)`, textAlign: "center" }}>
          <span style={{
            fontFamily: inter, fontSize: 28, fontWeight: 800,
            letterSpacing: "0.6em", color: C.goldLight, textTransform: "uppercase",
            textShadow: `0 2px 14px ${C.deep}b3`,
          }}>{p.brandTag}</span>
        </div>
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          marginTop: 28,
        }} />
        <div style={{
          opacity: titleSpring, transform: `scale(${0.8 + titleSpring * 0.2})`,
          textAlign: "center", marginTop: 40,
        }}>
          {[p.titleLine1, p.titleLine2].map((t) => (
            <h1 key={t} style={{
              fontFamily: cormorant, fontSize: 200, fontWeight: 500, lineHeight: 0.92,
              margin: 0, fontStyle: "italic",
              background: `linear-gradient(180deg, ${C.cream} 0%, ${C.goldLight} 60%, ${C.gold} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textShadow: `0 12px 50px ${C.deep}cc`,
            }}>{t}</h1>
          ))}
        </div>
        <p style={{
          opacity: subOp, fontFamily: inter, fontSize: 30, fontWeight: 300,
          color: C.pale, marginTop: 50, textAlign: "center",
          letterSpacing: "0.35em", textTransform: "uppercase",
        }}>{p.tagline}</p>
      </div>
    </AbsoluteFill>
  );
}

/* === Scene 2 === */
function Scene2({ p }: { p: VideoProps }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = p.palette;

  const bgGradient = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const prodSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 100 } });
  const prodFloat = Math.sin(frame * 0.05) * 14;
  const labelOp = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });

  const cards = p.benefits.map((b, i) => ({
    ...b,
    side: i % 2 === 0 ? "left" : "right",
    top: 360 + i * 180,
  }));

  return (
    <AbsoluteFill style={{ background: p.bgScene2, overflow: "hidden" }}>
      <GoldSparkles frame={frame + 100} count={26} gold={C.goldLight} ice={C.cream} />
      <Mist frame={frame + 200} count={14} color={C.cream} />

      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 940, height: 940, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.cream}b3 0%, ${C.goldLight}33 50%, transparent 75%)`,
        transform: `translate(-50%, -50%) scale(${bgGradient})`,
      }} />
      <div style={{
        position: "absolute", top: "52%", left: "50%", width: 720, height: 720, borderRadius: "50%",
        border: `2px dashed ${C.gold}88`,
        transform: `translate(-50%, -50%) rotate(${frame * 0.3}deg)`,
      }} />
      <div style={{
        position: "absolute", top: "52%", left: "50%", width: 820, height: 820, borderRadius: "50%",
        border: `1px solid ${C.gold}66`,
        transform: `translate(-50%, -50%) rotate(${-frame * 0.2}deg)`,
      }} />

      <div style={{
        position: "absolute", top: 80, width: "100%", textAlign: "center",
        opacity: labelOp, zIndex: 5,
      }}>
        <span style={{
          fontFamily: inter, fontSize: 22, fontWeight: 800,
          letterSpacing: "0.45em", color: C.deep, textTransform: "uppercase",
          background: "rgba(255,255,255,0.95)", padding: "16px 36px", borderRadius: 50,
          border: `2px solid ${C.gold}`, boxShadow: `0 8px 24px ${C.deep}40`,
        }}>{p.topLabel}</span>
      </div>

      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        opacity: prodSpring, transform: `translateY(${prodFloat}px) scale(${0.85 + prodSpring * 0.18})`,
        zIndex: 4,
      }}>
        <Img src={staticFile(p.image)} style={{
          width: 700, height: 700, objectFit: "contain",
          filter: `drop-shadow(0 24px 50px ${C.deep}88) drop-shadow(0 0 30px ${C.goldLight}73)`,
        }} />
      </div>

      {cards.map((b, i) => {
        const delay = 30 + i * 14;
        const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 130 } });
        const op = interpolate(frame, [delay, delay + 22], [0, 1], { extrapolateRight: "clamp" });
        const isLeft = b.side === "left";
        const x = isLeft ? -40 + (1 - s) * -80 : 40 + (1 - s) * 80;
        return (
          <div key={b.text} style={{
            position: "absolute", top: b.top,
            [isLeft ? "left" : "right"]: 24,
            opacity: op, transform: `translateX(${x}px) scale(${0.82 + s * 0.18})`,
            background: `linear-gradient(135deg, #ffffff 0%, ${C.pale} 70%, ${C.cream} 100%)`,
            padding: "20px 30px 20px 22px", borderRadius: 28,
            boxShadow: `0 14px 38px ${C.deep}50, inset 0 1px 0 rgba(255,255,255,0.9)`,
            border: `2px solid ${C.gold}`,
            display: "flex", alignItems: "center", gap: 16, zIndex: 6, minWidth: 380,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.deep, fontSize: 28,
              boxShadow: `inset 0 -3px 6px ${C.deep}40, 0 4px 10px ${C.gold}80`,
            }}>{b.icon}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{
                fontFamily: cormorant, fontSize: 32, fontWeight: 700,
                color: C.deep, letterSpacing: "0.02em", fontStyle: "italic", lineHeight: 1,
              }}>{b.text}</span>
              <span style={{
                fontFamily: inter, fontSize: 16, fontWeight: 600,
                color: C.mid, marginTop: 4, letterSpacing: "0.18em", textTransform: "uppercase",
              }}>{b.sub}</span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* === Scene 3 === */
function Scene3({ p }: { p: VideoProps }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = p.palette;

  const bgOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const prodOp = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const prodY = interpolate(frame, [10, 40], [40, 0], { extrapolateRight: "clamp" });
  const priceSpring = spring({ frame: frame - 55, fps, config: { damping: 11, stiffness: 130 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.02;
  const ctaOp = interpolate(frame, [95, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: p.bgScene3, opacity: bgOp }}>
      <GoldSparkles frame={frame + 300} count={32} gold={C.goldLight} ice={C.pale} />
      <Mist frame={frame + 400} count={14} color={C.pale} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, transparent 35%, ${C.gold}30 70%, transparent 100%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "70px 60px", gap: 22, zIndex: 5,
      }}>
        <div style={{ opacity: prodOp, transform: `translateY(${prodY}px)` }}>
          <Img src={staticFile(p.image)} style={{
            width: 320, height: 320, objectFit: "contain",
            filter: `drop-shadow(0 18px 42px rgba(0,0,0,0.6)) drop-shadow(0 0 28px ${C.goldLight}8c)`,
          }} />
        </div>
        <h2 style={{
          fontFamily: cormorant, fontSize: 78, fontStyle: "italic", fontWeight: 500,
          margin: 0, opacity: prodOp, textAlign: "center", lineHeight: 1,
          background: `linear-gradient(180deg, ${C.cream} 0%, ${C.goldLight} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{p.titleLine1} {p.titleLine2}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginTop: 6 }}>
          {p.importanceLines.map((l, i) => {
            const delay = 30 + i * 14;
            const op = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
            const y = interpolate(frame, [delay, delay + 22], [12, 0], { extrapolateRight: "clamp" });
            return (
              <div key={l} style={{
                opacity: op, transform: `translateY(${y}px)`,
                fontFamily: cormorant, fontSize: 36, fontStyle: "italic",
                color: C.pale, textAlign: "center", letterSpacing: "0.02em",
              }}>{l}</div>
            );
          })}
        </div>

        <div style={{
          opacity: interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${(0.85 + priceSpring * 0.15) * pulse})`,
          background: `linear-gradient(135deg, ${C.cream} 0%, ${C.goldLight} 60%, ${C.gold} 100%)`,
          border: `4px solid ${C.cream}`, borderRadius: 38,
          padding: "32px 70px", textAlign: "center",
          boxShadow: `0 26px 80px rgba(0,0,0,0.55), 0 0 50px ${C.goldLight}73, inset 0 2px 24px rgba(255,255,255,0.6)`,
          marginTop: 6, position: "relative",
        }}>
          {["top:10;left:16", "top:10;right:16", "bottom:10;left:16", "bottom:10;right:16"].map((pos) => {
            const o: any = {};
            pos.split(";").forEach((kv) => { const [k, v] = kv.split(":"); o[k] = Number(v); });
            return <div key={pos} style={{ position: "absolute", ...o, color: C.deep, fontSize: 20 }}>✦</div>;
          })}
          <div style={{
            fontFamily: inter, fontSize: 20, fontWeight: 800, color: C.deep,
            letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 4,
          }}>{p.unitLabel}</div>
          <div style={{
            fontFamily: cormorant, fontSize: 150, fontWeight: 700,
            color: C.deep, lineHeight: 0.9, fontStyle: "italic",
          }}>{p.price}</div>
          <div style={{
            fontFamily: inter, fontSize: 30, fontWeight: 800, color: C.deep,
            marginTop: 2, letterSpacing: "0.3em",
          }}>KSh</div>
        </div>

        <div style={{
          opacity: ctaOp, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, marginTop: 4,
        }}>
          <span style={{
            fontFamily: inter, fontSize: 20, fontWeight: 800, color: C.goldLight,
            letterSpacing: "0.4em", textTransform: "uppercase",
          }}>✦ Order on WhatsApp ✦</span>
          <span style={{
            fontFamily: cormorant, fontSize: 50, fontWeight: 700,
            color: C.cream, fontStyle: "italic",
          }}>0141 612 025</span>
          <span style={{
            fontFamily: inter, fontSize: 15, fontWeight: 600, color: C.pale,
            letterSpacing: "0.35em", textTransform: "uppercase", marginTop: 2,
          }}>BF Suma Kenya</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function MainVideo(props: VideoProps) {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}><Scene1 p={props} /></Sequence>
      <Sequence from={90} durationInFrames={135}><Scene2 p={props} /></Sequence>
      <Sequence from={225} durationInFrames={165}><Scene3 p={props} /></Sequence>
    </AbsoluteFill>
  );
}
