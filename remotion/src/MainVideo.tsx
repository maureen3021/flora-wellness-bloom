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

const { fontFamily: playfair } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});
const { fontFamily: inter } = loadFont2("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin"],
});

/* === Floating petals === */
function Petals({ frame, count = 18 }: { frame: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 137.5;
        const x = (seed % 1080);
        const speed = 0.4 + ((i % 5) * 0.15);
        const y = ((frame * speed * 6) + seed * 3) % 2400 - 200;
        const sway = Math.sin((frame + i * 20) * 0.04) * 40;
        const rot = (frame * 1.5 + i * 30) % 360;
        const size = 14 + (i % 4) * 6;
        const op = 0.35 + (i % 3) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              width: size,
              height: size * 1.4,
              background: i % 2 === 0
                ? "radial-gradient(ellipse at 50% 30%, #ffd1e0, #e76b9b 80%)"
                : "radial-gradient(ellipse at 50% 30%, #fff0dc, #d4a574 80%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: `rotate(${rot}deg)`,
              opacity: op,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </>
  );
}

/* ============ SCENE 1: Intro — "For Her" (0-90 frames) ============ */
function Scene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 110 } });
  const subOp = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [30, 70], [0, 280], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #f9d5e3 0%, #f4a8c6 35%, #b35280 75%, #5a1f3d 100%)",
      }}
    >
      <Petals frame={frame} count={14} />

      {/* Soft glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 70%, rgba(255,220,235,0.4) 0%, transparent 60%)",
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
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "0.5em",
              color: "#fff0f5",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(90,31,61,0.5)",
            }}
          >
            BF SUMA
          </span>
        </div>

        <div style={{ width: lineW, height: 2, background: "#fff0f5", marginTop: 28, opacity: 0.8 }} />

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
              fontFamily: playfair,
              fontSize: 170,
              fontWeight: 900,
              color: "#fff8fb",
              lineHeight: 0.95,
              margin: 0,
              fontStyle: "italic",
              textShadow: "0 8px 40px rgba(90,31,61,0.6)",
            }}
          >
            Femi
          </h1>
          <h1
            style={{
              fontFamily: playfair,
              fontSize: 170,
              fontWeight: 900,
              color: "#fff8fb",
              lineHeight: 0.95,
              margin: 0,
              fontStyle: "italic",
              textShadow: "0 8px 40px rgba(90,31,61,0.6)",
            }}
          >
            Biotics
          </h1>
        </div>

        <p
          style={{
            opacity: subOp,
            fontFamily: inter,
            fontSize: 34,
            fontWeight: 400,
            color: "#fff0f5",
            marginTop: 50,
            textAlign: "center",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Wellness, made for her
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 2: Product showcase (90-225 frames) ============ */
function Scene2() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGradient = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const prodSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 100 } });
  const prodFloat = Math.sin(frame * 0.05) * 12;
  const prodScale = interpolate(frame, [0, 135], [1, 1.06], { extrapolateRight: "clamp" });

  const labelOp = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });

  // Benefit tags stagger
  const benefits = [
    { text: "Gut Balance", side: "left", top: 380 },
    { text: "Immunity", side: "right", top: 560 },
    { text: "Feminine Care", side: "left", top: 740 },
    { text: "Daily Vitality", side: "right", top: 920 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #fff5f8 0%, #fde0ec 40%, #f4a8c6 100%)",
        overflow: "hidden",
      }}
    >
      <Petals frame={frame + 200} count={10} />

      {/* Soft circle accent behind product */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
          transform: `translate(-50%, -50%) scale(${bgGradient})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "2px dashed rgba(179,82,128,0.3)",
          transform: `translate(-50%, -50%) rotate(${frame * 0.3}deg)`,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 90,
          width: "100%",
          textAlign: "center",
          opacity: labelOp,
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.4em",
            color: "#b35280",
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.85)",
            padding: "14px 32px",
            borderRadius: 50,
            border: "2px solid #e76b9b",
          }}
        >
          Probiotic + Vitamin Blend
        </span>
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
          transform: `translateY(${prodFloat}px) scale(${0.85 + prodSpring * 0.15 * prodScale})`,
        }}
      >
        <Img
          src={staticFile("images/femibiotics.jpg")}
          style={{
            width: 720,
            height: 720,
            objectFit: "contain",
            filter: "drop-shadow(0 30px 60px rgba(179,82,128,0.45))",
          }}
        />
      </div>

      {/* Floating benefit tags */}
      {benefits.map((b, i) => {
        const delay = 30 + i * 12;
        const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 130 } });
        const op = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
        const isLeft = b.side === "left";
        const x = isLeft ? -40 + (1 - s) * -60 : 40 + (1 - s) * 60;
        return (
          <div
            key={b.text}
            style={{
              position: "absolute",
              top: b.top,
              [isLeft ? "left" : "right"]: 30,
              opacity: op,
              transform: `translateX(${x}px) scale(${0.8 + s * 0.2})`,
              background: "linear-gradient(135deg, #ffffff 0%, #ffe4ee 100%)",
              padding: "18px 28px",
              borderRadius: 999,
              boxShadow: "0 10px 28px rgba(179,82,128,0.25)",
              border: "2px solid #f4a8c6",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 6,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e76b9b, #b35280)",
              }}
            />
            <span
              style={{
                fontFamily: inter,
                fontSize: 26,
                fontWeight: 800,
                color: "#5a1f3d",
                letterSpacing: "0.05em",
              }}
            >
              {b.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* ============ SCENE 3: Price + CTA card (225-360 frames) ============ */
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
          "linear-gradient(180deg, #5a1f3d 0%, #8a3a5e 50%, #b35280 100%)",
        opacity: bgOp,
      }}
    >
      <Petals frame={frame + 400} count={12} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
          gap: 30,
          zIndex: 5,
        }}
      >
        <div style={{ opacity: prodOp, transform: `translateY(${prodY}px)` }}>
          <Img
            src={staticFile("images/femibiotics.jpg")}
            style={{
              width: 360,
              height: 360,
              objectFit: "contain",
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: playfair,
            fontSize: 64,
            fontStyle: "italic",
            fontWeight: 700,
            color: "#fff0f5",
            margin: 0,
            opacity: prodOp,
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          FemiBiotics
        </h2>

        <p
          style={{
            fontFamily: inter,
            fontSize: 26,
            fontWeight: 400,
            color: "#ffd1e0",
            margin: 0,
            opacity: taglineOp,
            textAlign: "center",
            letterSpacing: "0.1em",
            maxWidth: 800,
          }}
        >
          Daily probiotic care that loves you back
        </p>

        {/* Big price card */}
        <div
          style={{
            opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${(0.85 + priceSpring * 0.15) * pulse})`,
            background:
              "linear-gradient(135deg, #fff5f8 0%, #ffd1e0 60%, #e76b9b 100%)",
            border: "5px solid #fff8fb",
            borderRadius: 36,
            padding: "44px 70px",
            textAlign: "center",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.4), inset 0 2px 24px rgba(255,255,255,0.5)",
            marginTop: 10,
          }}
        >
          <div
            style={{
              fontFamily: inter,
              fontSize: 26,
              fontWeight: 800,
              color: "#8a3a5e",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Only
          </div>
          <div
            style={{
              fontFamily: playfair,
              fontSize: 160,
              fontWeight: 900,
              color: "#5a1f3d",
              lineHeight: 0.9,
              textShadow: "0 4px 12px rgba(255,255,255,0.4)",
            }}
          >
            6,480
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 38,
              fontWeight: 800,
              color: "#8a3a5e",
              marginTop: 8,
              letterSpacing: "0.2em",
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
            gap: 12,
            marginTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 22,
              fontWeight: 800,
              color: "#fff0f5",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Order on WhatsApp
          </span>
          <span
            style={{
              fontFamily: playfair,
              fontSize: 44,
              fontWeight: 700,
              color: "#fff8fb",
              fontStyle: "italic",
            }}
          >
            0141 612 025
          </span>
          <span
            style={{
              fontFamily: inter,
              fontSize: 18,
              fontWeight: 600,
              color: "#ffd1e0",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            BF Suma Kenya
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
