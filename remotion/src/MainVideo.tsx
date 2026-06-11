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

/* Navy + gold palette */
const C = {
  deep: "#040d2b",
  navy: "#0b1d4a",
  blue: "#1a3a8a",
  ice: "#9ec6ff",
  sky: "#cfe3ff",
  gold: "#d4af37",
  goldLight: "#f4d97a",
  cream: "#fff7e3",
};

/* === Cool mist / snowflake particles === */
function Mist({ frame, count = 24 }: { frame: number; count?: number }) {
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
              background:
                "radial-gradient(circle, rgba(207,227,255,0.85), rgba(207,227,255,0) 70%)",
              opacity: op,
              filter: "blur(2px)",
            }}
          />
        );
      })}
    </>
  );
}

function GoldSparkles({ frame, count = 30 }: { frame: number; count?: number }) {
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
              background: i % 3 === 0 ? "#cfe3ff" : "#f4d97a",
              boxShadow:
                i % 3 === 0
                  ? "0 0 12px 2px rgba(207,227,255,0.95)"
                  : "0 0 12px 2px rgba(244,217,122,0.9)",
              opacity: tw,
            }}
          />
        );
      })}
    </>
  );
}

/* ============ SCENE 1: Intro (0-90) ============ */
function Scene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 110 } });
  const subOp = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [30, 70], [0, 340], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 30% 15%, #1a3a8a 0%, #0b1d4a 45%, #040d2b 100%)",
      }}
    >
      <GoldSparkles frame={frame} count={32} />
      <Mist frame={frame} count={18} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.28) 0%, transparent 55%)",
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
              color: C.goldLight,
              textTransform: "uppercase",
              textShadow: "0 2px 14px rgba(4,13,43,0.7)",
            }}
          >
            BF SUMA · HERBAL
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
              fontSize: 220,
              fontWeight: 500,
              lineHeight: 0.92,
              margin: 0,
              fontStyle: "italic",
              background: `linear-gradient(180deg, #fff7e3 0%, ${C.goldLight} 60%, ${C.gold} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 12px 50px rgba(4,13,43,0.8)",
            }}
          >
            Cool
          </h1>
          <h1
            style={{
              fontFamily: cormorant,
              fontSize: 220,
              fontWeight: 500,
              lineHeight: 0.92,
              margin: 0,
              fontStyle: "italic",
              background: `linear-gradient(180deg, #fff7e3 0%, ${C.goldLight} 60%, ${C.gold} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 12px 50px rgba(4,13,43,0.8)",
            }}
          >
            Roll
          </h1>
        </div>

        <p
          style={{
            opacity: subOp,
            fontFamily: inter,
            fontSize: 30,
            fontWeight: 300,
            color: C.sky,
            marginTop: 50,
            textAlign: "center",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          ✦ Instant relief, anywhere ✦
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 2: Benefits + product (90-225) ============ */
function Scene2() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGradient = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const prodSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 100 } });
  const prodFloat = Math.sin(frame * 0.05) * 14;

  const labelOp = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });

  const benefits = [
    { text: "Headache Relief", sub: "Calms tension fast", side: "left", top: 360, icon: "✦" },
    { text: "Beats Dizziness", sub: "Refresh & re-center", side: "right", top: 540, icon: "❄" },
    { text: "Cooling Menthol", sub: "Instant icy comfort", side: "left", top: 720, icon: "✧" },
    { text: "On-the-Go", sub: "Pocket. Purse. Travel.", side: "right", top: 900, icon: "✿" },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #e8f1ff 0%, #b8d3ff 35%, #5b88d9 75%, #1a3a8a 100%)",
        overflow: "hidden",
      }}
    >
      <GoldSparkles frame={frame + 100} count={26} />
      <Mist frame={frame + 200} count={14} />

      {/* Concentric gold rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 940,
          height: 940,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(244,217,122,0.18) 50%, rgba(255,255,255,0) 75%)",
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
          border: `2px dashed ${C.gold}88`,
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
          border: `1px solid ${C.gold}66`,
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
            color: C.navy,
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.95)",
            padding: "16px 36px",
            borderRadius: 50,
            border: `2px solid ${C.gold}`,
            boxShadow: "0 8px 24px rgba(11,29,74,0.25)",
          }}
        >
          ✦ Why You'll Love It ✦
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
          transform: `translateY(${prodFloat}px) scale(${0.85 + prodSpring * 0.18})`,
          zIndex: 4,
        }}
      >
        <Img
          src={staticFile("images/coolroll.jpg")}
          style={{
            width: 700,
            height: 700,
            objectFit: "contain",
            filter:
              "drop-shadow(0 24px 50px rgba(11,29,74,0.55)) drop-shadow(0 0 30px rgba(244,217,122,0.45))",
          }}
        />
      </div>

      {/* Benefit cards */}
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
                "linear-gradient(135deg, #ffffff 0%, #eaf2ff 70%, #fff5d0 100%)",
              padding: "20px 30px 20px 22px",
              borderRadius: 28,
              boxShadow:
                "0 14px 38px rgba(11,29,74,0.32), inset 0 1px 0 rgba(255,255,255,0.9)",
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
                color: C.navy,
                fontSize: 28,
                boxShadow:
                  "inset 0 -3px 6px rgba(11,29,74,0.25), 0 4px 10px rgba(212,175,55,0.5)",
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
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.blue,
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

/* ============ SCENE 3: Importance + CTA (225-390) ============ */
function Scene3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const prodOp = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const prodY = interpolate(frame, [10, 40], [40, 0], { extrapolateRight: "clamp" });

  const priceSpring = spring({ frame: frame - 55, fps, config: { damping: 11, stiffness: 130 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.02;

  const ctaOp = interpolate(frame, [95, 120], [0, 1], { extrapolateRight: "clamp" });

  // Importance lines stagger
  const lines = [
    "Long days. Sharp focus.",
    "Travel sickness, gone.",
    "A wellness essential in every bag.",
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a3a8a 0%, #0b1d4a 55%, #040d2b 100%)",
        opacity: bgOp,
      }}
    >
      <GoldSparkles frame={frame + 300} count={32} />
      <Mist frame={frame + 400} count={14} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(212,175,55,0.18) 70%, transparent 100%)",
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
          padding: "70px 60px",
          gap: 22,
          zIndex: 5,
        }}
      >
        <div style={{ opacity: prodOp, transform: `translateY(${prodY}px)` }}>
          <Img
            src={staticFile("images/coolroll.jpg")}
            style={{
              width: 320,
              height: 320,
              objectFit: "contain",
              filter:
                "drop-shadow(0 18px 42px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(244,217,122,0.55))",
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
            background: `linear-gradient(180deg, #fff7e3 0%, ${C.goldLight} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cool Roll
        </h2>

        {/* Importance lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginTop: 6 }}>
          {lines.map((l, i) => {
            const delay = 30 + i * 14;
            const op = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
            const y = interpolate(frame, [delay, delay + 22], [12, 0], { extrapolateRight: "clamp" });
            return (
              <div
                key={l}
                style={{
                  opacity: op,
                  transform: `translateY(${y}px)`,
                  fontFamily: cormorant,
                  fontSize: 36,
                  fontStyle: "italic",
                  color: C.sky,
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}
              >
                {l}
              </div>
            );
          })}
        </div>

        {/* Price card */}
        <div
          style={{
            opacity: interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${(0.85 + priceSpring * 0.15) * pulse})`,
            background:
              "linear-gradient(135deg, #fff7e3 0%, #f4d97a 60%, #d4af37 100%)",
            border: `4px solid ${C.cream}`,
            borderRadius: 38,
            padding: "32px 70px",
            textAlign: "center",
            boxShadow:
              "0 26px 80px rgba(0,0,0,0.55), 0 0 50px rgba(244,217,122,0.45), inset 0 2px 24px rgba(255,255,255,0.6)",
            marginTop: 6,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 10, left: 16, color: C.navy, fontSize: 20 }}>✦</div>
          <div style={{ position: "absolute", top: 10, right: 16, color: C.navy, fontSize: 20 }}>✦</div>
          <div style={{ position: "absolute", bottom: 10, left: 16, color: C.navy, fontSize: 20 }}>✦</div>
          <div style={{ position: "absolute", bottom: 10, right: 16, color: C.navy, fontSize: 20 }}>✦</div>

          <div
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 800,
              color: C.navy,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            1 Dozen · Only
          </div>
          <div
            style={{
              fontFamily: cormorant,
              fontSize: 150,
              fontWeight: 700,
              color: C.deep,
              lineHeight: 0.9,
              fontStyle: "italic",
            }}
          >
            1,896
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 30,
              fontWeight: 800,
              color: C.navy,
              marginTop: 2,
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
            gap: 8,
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 800,
              color: C.goldLight,
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
              fontSize: 15,
              fontWeight: 600,
              color: C.ice,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginTop: 2,
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
      <Sequence from={225} durationInFrames={165}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
}
