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

/* ===== Shared palette (rose-gold + champagne + deep mauve) ===== */
const C = {
  rose: "#e9b6c4",
  blush: "#fbe4ec",
  champagne: "#f7e7c8",
  gold: "#c9a25b",
  goldLight: "#e8c98a",
  deep: "#3a1024",
  mauve: "#7a2a4d",
  cream: "#fff7f1",
};

/* === Floating petals & sparkles === */
function Petals({ frame, count = 22 }: { frame: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 137.5;
        const x = (seed % 1080);
        const speed = 0.35 + ((i % 5) * 0.18);
        const y = ((frame * speed * 6) + seed * 3) % 2400 - 200;
        const sway = Math.sin((frame + i * 20) * 0.04) * 50;
        const rot = (frame * 1.5 + i * 30) % 360;
        const size = 16 + (i % 4) * 8;
        const op = 0.4 + (i % 3) * 0.18;
        const isGold = i % 3 === 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              width: size,
              height: size * 1.4,
              background: isGold
                ? "radial-gradient(ellipse at 50% 30%, #fff3d6, #c9a25b 85%)"
                : i % 2 === 0
                ? "radial-gradient(ellipse at 50% 30%, #ffd6e3, #e76b9b 85%)"
                : "radial-gradient(ellipse at 50% 30%, #fff0dc, #d4a574 85%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: `rotate(${rot}deg)`,
              opacity: op,
              filter: "blur(0.4px)",
            }}
          />
        );
      })}
    </>
  );
}

function Sparkles({ frame, count = 30 }: { frame: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 91.7;
        const x = (seed * 13) % 1080;
        const y = (seed * 29) % 1920;
        const phase = (frame * 0.06 + i * 0.7) % (Math.PI * 2);
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
              background: i % 2 === 0 ? "#fff6dc" : "#ffd9e6",
              boxShadow: i % 2 === 0
                ? "0 0 12px 2px rgba(255,225,150,0.9)"
                : "0 0 10px 2px rgba(255,180,210,0.8)",
              opacity: tw * 0.95,
            }}
          />
        );
      })}
    </>
  );
}

/* Pink/gold capsules to show what's "inside" */
function Capsule({
  x, y, rot, scale = 1, frame, delay = 0,
}: { x: number; y: number; rot: number; scale?: number; frame: number; delay?: number }) {
  const float = Math.sin((frame + delay) * 0.05) * 14;
  const spin = rot + Math.sin((frame + delay) * 0.02) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        transform: `rotate(${spin}deg) scale(${scale})`,
        width: 240,
        height: 90,
        borderRadius: 999,
        background:
          "linear-gradient(90deg, #fff 0%, #fff 50%, #f4b9cf 50%, #d77ba0 100%)",
        boxShadow:
          "0 14px 30px rgba(122,42,77,0.35), inset 0 4px 10px rgba(255,255,255,0.7), inset 0 -6px 14px rgba(122,42,77,0.15)",
        border: "2px solid rgba(255,255,255,0.9)",
      }}
    >
      {/* Gloss highlight */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 18,
          right: 18,
          height: 14,
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0))",
        }}
      />
    </div>
  );
}

/* ============ SCENE 1: Intro — "For Her" (0-90) ============ */
function Scene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 110 } });
  const subOp = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [30, 70], [0, 320], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 30% 15%, #fce6ef 0%, #f4a8c6 30%, #a04571 70%, #3a1024 100%)",
      }}
    >
      <Sparkles frame={frame} count={28} />
      <Petals frame={frame} count={14} />

      {/* Gold shimmer overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(232,201,138,0.35) 0%, transparent 55%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          zIndex: 5,
        }}
      >
        <div style={{ opacity: brandOp, transform: `translateY(${brandY}px)`, textAlign: "center" }}>
          <span
            style={{
              fontFamily: inter,
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.6em",
              color: C.champagne,
              textTransform: "uppercase",
              textShadow: "0 2px 14px rgba(58,16,36,0.6)",
            }}
          >
            BF SUMA · LUXE
          </span>
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
            marginTop: 28,
          }}
        />

        <div
          style={{
            opacity: titleSpring,
            transform: `scale(${0.8 + titleSpring * 0.2})`,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          <h1
            style={{
              fontFamily: cormorant,
              fontSize: 200,
              fontWeight: 500,
              color: C.cream,
              lineHeight: 0.92,
              margin: 0,
              fontStyle: "italic",
              textShadow: "0 10px 50px rgba(58,16,36,0.6)",
              background: `linear-gradient(180deg, #fff7f1 0%, ${C.goldLight} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Femi
          </h1>
          <h1
            style={{
              fontFamily: cormorant,
              fontSize: 200,
              fontWeight: 500,
              lineHeight: 0.92,
              margin: 0,
              fontStyle: "italic",
              textShadow: "0 10px 50px rgba(58,16,36,0.6)",
              background: `linear-gradient(180deg, #fff7f1 0%, ${C.goldLight} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Biotics
          </h1>
        </div>

        <p
          style={{
            opacity: subOp,
            fontFamily: inter,
            fontSize: 30,
            fontWeight: 300,
            color: C.cream,
            marginTop: 50,
            textAlign: "center",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          ✦ Wellness, refined for her ✦
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 2: Show the inside (90-225) ============ */
function Scene2() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGradient = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const prodSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 100 } });
  const prodFloat = Math.sin(frame * 0.05) * 14;

  // Capsules pour in
  const capsulesIn = interpolate(frame, [25, 70], [0, 1], { extrapolateRight: "clamp" });

  const labelOp = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });

  // Benefit cards — bigger, more visible
  const benefits = [
    { text: "Gut Balance", sub: "Live Probiotics", side: "left", top: 360, icon: "✿" },
    { text: "Immunity Boost", sub: "Vitamin C + Zinc", side: "right", top: 540, icon: "✦" },
    { text: "Feminine Care", sub: "pH Harmony", side: "left", top: 720, icon: "❀" },
    { text: "Daily Glow", sub: "Skin · Energy · Mood", side: "right", top: 900, icon: "✧" },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #fff5f8 0%, #fde0ec 35%, #f4b9d0 75%, #d77ba0 100%)",
        overflow: "hidden",
      }}
    >
      <Sparkles frame={frame + 100} count={26} />
      <Petals frame={frame + 200} count={10} />

      {/* Soft circle accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 940,
          height: 940,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,247,225,0.25) 50%, rgba(255,255,255,0) 75%)",
          transform: `translate(-50%, -50%) scale(${bgGradient})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          border: `2px dashed ${C.gold}66`,
          transform: `translate(-50%, -50%) rotate(${frame * 0.3}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          width: 820,
          height: 820,
          borderRadius: "50%",
          border: `1px solid ${C.gold}55`,
          transform: `translate(-50%, -50%) rotate(${-frame * 0.2}deg)`,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: labelOp,
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.45em",
            color: C.mauve,
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.92)",
            padding: "16px 36px",
            borderRadius: 50,
            border: `2px solid ${C.gold}`,
            boxShadow: "0 8px 24px rgba(122,42,77,0.18)",
          }}
        >
          ✦ What's Inside ✦
        </span>
      </div>

      {/* Capsules pouring from the bottle */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 0,
          right: 0,
          height: 500,
          opacity: capsulesIn,
          zIndex: 3,
        }}
      >
        <Capsule frame={frame} x={120} y={20} rot={-22} scale={0.9} delay={0} />
        <Capsule frame={frame} x={720} y={60} rot={28} scale={0.85} delay={20} />
        <Capsule frame={frame} x={80} y={240} rot={15} scale={1} delay={40} />
        <Capsule frame={frame} x={760} y={300} rot={-12} scale={0.95} delay={60} />
        <Capsule frame={frame} x={420} y={380} rot={5} scale={1.05} delay={80} />
      </div>

      {/* Product image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: prodSpring,
          transform: `translateY(${prodFloat}px) scale(${0.85 + prodSpring * 0.18})`,
          zIndex: 4,
        }}
      >
        <Img
          src={staticFile("images/femibiotics.jpg")}
          style={{
            width: 700,
            height: 700,
            objectFit: "contain",
            filter:
              "drop-shadow(0 24px 50px rgba(122,42,77,0.5)) drop-shadow(0 0 30px rgba(232,201,138,0.4))",
          }}
        />
      </div>

      {/* Benefit cards — pill style, with icon + subline */}
      {benefits.map((b, i) => {
        const delay = 30 + i * 14;
        const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 130 } });
        const op = interpolate(frame, [delay, delay + 22], [0, 1], { extrapolateRight: "clamp" });
        const isLeft = b.side === "left";
        const x = isLeft ? -40 + (1 - s) * -80 : 40 + (1 - s) * 80;
        return (
          <div
            key={b.text}
            style={{
              position: "absolute",
              top: b.top,
              [isLeft ? "left" : "right"]: 24,
              opacity: op,
              transform: `translateX(${x}px) scale(${0.82 + s * 0.18})`,
              background:
                "linear-gradient(135deg, #ffffff 0%, #fff0f5 70%, #ffe2c8 100%)",
              padding: "20px 30px 20px 22px",
              borderRadius: 28,
              boxShadow:
                "0 14px 38px rgba(122,42,77,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
              border: `2px solid ${C.gold}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              zIndex: 6,
              minWidth: 380,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 28,
                boxShadow: "inset 0 -3px 6px rgba(122,42,77,0.25), 0 4px 10px rgba(201,162,91,0.4)",
              }}
            >
              {b.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: cormorant,
                  fontSize: 32,
                  fontWeight: 700,
                  color: C.deep,
                  letterSpacing: "0.02em",
                  fontStyle: "italic",
                  lineHeight: 1,
                }}
              >
                {b.text}
              </span>
              <span
                style={{
                  fontFamily: inter,
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.mauve,
                  marginTop: 4,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {b.sub}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* ============ SCENE 3: Price + CTA (225-360) ============ */
function Scene3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const prodOp = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const prodY = interpolate(frame, [10, 40], [40, 0], { extrapolateRight: "clamp" });

  const priceSpring = spring({ frame: frame - 25, fps, config: { damping: 11, stiffness: 130 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.02;

  const ctaOp = interpolate(frame, [70, 95], [0, 1], { extrapolateRight: "clamp" });
  const taglineOp = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #7a2a4d 0%, #4a1530 60%, #2a0a1c 100%)",
        opacity: bgOp,
      }}
    >
      <Sparkles frame={frame + 300} count={32} />
      <Petals frame={frame + 400} count={12} />

      {/* Gold rim glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(201,162,91,0.18) 70%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
          gap: 26,
          zIndex: 5,
        }}
      >
        <div style={{ opacity: prodOp, transform: `translateY(${prodY}px)` }}>
          <Img
            src={staticFile("images/femibiotics.jpg")}
            style={{
              width: 340,
              height: 340,
              objectFit: "contain",
              filter:
                "drop-shadow(0 18px 42px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(232,201,138,0.5))",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: cormorant,
            fontSize: 78,
            fontStyle: "italic",
            fontWeight: 500,
            margin: 0,
            opacity: prodOp,
            textAlign: "center",
            lineHeight: 1,
            background: `linear-gradient(180deg, #fff7f1 0%, ${C.goldLight} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FemiBiotics
        </h2>

        <p
          style={{
            fontFamily: inter,
            fontSize: 24,
            fontWeight: 300,
            color: C.champagne,
            margin: 0,
            opacity: taglineOp,
            textAlign: "center",
            letterSpacing: "0.18em",
            maxWidth: 800,
            textTransform: "uppercase",
          }}
        >
          A daily ritual she'll love
        </p>

        {/* Big price card */}
        <div
          style={{
            opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${(0.85 + priceSpring * 0.15) * pulse})`,
            background:
              "linear-gradient(135deg, #fff7f1 0%, #ffd9e6 50%, #e8c98a 100%)",
            border: `4px solid ${C.gold}`,
            borderRadius: 38,
            padding: "40px 80px",
            textAlign: "center",
            boxShadow:
              "0 26px 80px rgba(0,0,0,0.5), 0 0 50px rgba(232,201,138,0.4), inset 0 2px 24px rgba(255,255,255,0.6)",
            marginTop: 6,
            position: "relative",
          }}
        >
          {/* corner sparkles */}
          <div style={{ position: "absolute", top: 12, left: 18, color: C.gold, fontSize: 22 }}>✦</div>
          <div style={{ position: "absolute", top: 12, right: 18, color: C.gold, fontSize: 22 }}>✦</div>
          <div style={{ position: "absolute", bottom: 12, left: 18, color: C.gold, fontSize: 22 }}>✦</div>
          <div style={{ position: "absolute", bottom: 12, right: 18, color: C.gold, fontSize: 22 }}>✦</div>

          <div
            style={{
              fontFamily: inter,
              fontSize: 22,
              fontWeight: 800,
              color: C.mauve,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Indulge from
          </div>
          <div
            style={{
              fontFamily: cormorant,
              fontSize: 170,
              fontWeight: 700,
              color: C.deep,
              lineHeight: 0.9,
              fontStyle: "italic",
              textShadow: "0 4px 12px rgba(255,255,255,0.4)",
            }}
          >
            6,480
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 32,
              fontWeight: 800,
              color: C.mauve,
              marginTop: 4,
              letterSpacing: "0.3em",
            }}
          >
            KSh
          </div>
        </div>

        <div
          style={{
            opacity: ctaOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 800,
              color: C.champagne,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            ✦ Order on WhatsApp ✦
          </span>
          <span
            style={{
              fontFamily: cormorant,
              fontSize: 50,
              fontWeight: 700,
              color: C.cream,
              fontStyle: "italic",
            }}
          >
            0141 612 025
          </span>
          <span
            style={{
              fontFamily: inter,
              fontSize: 16,
              fontWeight: 600,
              color: C.goldLight,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            BF Suma Kenya · Luxe Wellness
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ============ Main ============ */
export function MainVideo() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Scene1 />
      </Sequence>
      <Sequence from={90} durationInFrames={135}>
        <Scene2 />
      </Sequence>
      <Sequence from={225} durationInFrames={135}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
}
