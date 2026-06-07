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

/* ============ SCENE 1: Brand Intro (0-75 frames) ============ */
function Scene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 110 } });
  const descOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });

  // Soap teaser zooming in from background
  const soapScale = interpolate(frame, [0, 75], [0.4, 1.1], { extrapolateRight: "clamp" });
  const soapOpacity = interpolate(frame, [10, 45], [0, 0.35], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 60%, #4a2e0e 0%, #1a0f04 100%)" }}>
      {/* Soap silhouette teaser */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: soapOpacity,
          transform: `scale(${soapScale})`,
          filter: "blur(8px)",
        }}
      >
        <Img src={staticFile("images/soap-honey.png")} style={{ width: 1100, height: 1100, objectFit: "contain" }} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ opacity: brandOpacity, transform: `translateY(${brandY}px)`, textAlign: "center" }}>
          <span
            style={{
              fontFamily: inter,
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "0.4em",
              color: "#f5c45e",
              textTransform: "uppercase",
            }}
          >
            BF SUMA
          </span>
        </div>

        <div
          style={{
            opacity: brandOpacity,
            transform: `scale(${0.85 + titleScale * 0.15})`,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          <h1
            style={{
              fontFamily: playfair,
              fontSize: 130,
              fontWeight: 900,
              color: "#fff8e7",
              lineHeight: 1,
              margin: 0,
              textShadow: "0 6px 30px rgba(245,196,94,0.4)",
            }}
          >
            Anatic
          </h1>
          <h2
            style={{
              fontFamily: playfair,
              fontSize: 56,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#f5c45e",
              lineHeight: 1.2,
              margin: "12px 0 0 0",
            }}
          >
            Herbal Essence Soap
          </h2>
        </div>

        <p
          style={{
            opacity: descOpacity,
            fontFamily: inter,
            fontSize: 32,
            color: "#e8d5a8",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          Drenched in nature's gold
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ Honey Drip overlay ============ */
function HoneyDrips({ frame }: { frame: number }) {
  const drips = [
    { x: 120, delay: 0, length: 280, w: 22 },
    { x: 320, delay: 12, length: 380, w: 28 },
    { x: 520, delay: 6, length: 240, w: 20 },
    { x: 720, delay: 18, length: 340, w: 26 },
    { x: 920, delay: 3, length: 300, w: 24 },
  ];
  return (
    <>
      {drips.map((d, i) => {
        const f = frame - d.delay;
        const h = interpolate(f, [0, 40], [0, d.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const dropY = interpolate(f, [25, 70], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const dropOpacity = interpolate(f, [25, 30, 65, 70], [0, 1, 1, 0], { extrapolateRight: "clamp" });
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: d.x,
                width: d.w,
                height: h,
                background: "linear-gradient(180deg, #f5b842 0%, #d99220 80%, #b87810 100%)",
                borderRadius: `0 0 ${d.w}px ${d.w}px`,
                boxShadow: "inset -4px 0 8px rgba(184,120,16,0.6), inset 4px 0 6px rgba(255,220,140,0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: h + dropY,
                left: d.x - 4,
                width: d.w + 8,
                height: d.w + 12,
                background: "radial-gradient(circle at 35% 35%, #ffd97a, #d99220 70%, #a06808)",
                borderRadius: "50%",
                opacity: dropOpacity,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
          </div>
        );
      })}
    </>
  );
}

/* ============ SCENE 2: Close-up Soap with Honey (75-225 frames) ============ */
function Scene2() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Close-up zoom
  const soapScale = interpolate(frame, [0, 40, 150], [1.3, 1.55, 1.65], { extrapolateRight: "clamp" });
  const soapOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const soapX = interpolate(frame, [0, 150], [-20, 20], { extrapolateRight: "clamp" });

  // Top label
  const labelOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  // Size badge
  const sizeSpring = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 140 } });
  const sizeOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  // Smoothness badge
  const smoothSpring = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 140 } });
  const smoothOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #2d1808 0%, #1a0f04 100%)", overflow: "hidden" }}>
      {/* Honey drips from top */}
      <HoneyDrips frame={frame} />

      {/* Close-up soap */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: soapOpacity,
          transform: `scale(${soapScale}) translateX(${soapX}px)`,
        }}
      >
        <Img
          src={staticFile("images/soap-honey.png")}
          style={{
            width: 1000,
            height: 1000,
            objectFit: "contain",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 90,
          width: "100%",
          textAlign: "center",
          opacity: labelOpacity,
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.35em",
            color: "#f5c45e",
            textTransform: "uppercase",
            background: "rgba(26,15,4,0.7)",
            padding: "14px 30px",
            borderRadius: 50,
            border: "2px solid rgba(245,196,94,0.4)",
          }}
        >
          Pure Honey Infusion
        </span>
      </div>

      {/* Size badge - bottom left */}
      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 380,
          opacity: sizeOpacity,
          transform: `scale(${0.7 + sizeSpring * 0.3})`,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #f5c45e 0%, #d99220 100%)",
            borderRadius: 24,
            padding: "24px 32px",
            boxShadow: "0 12px 40px rgba(245,196,94,0.4)",
            border: "3px solid #fff8e7",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 18,
              fontWeight: 800,
              color: "#1a0f04",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            Full Size
          </span>
          <span
            style={{
              fontFamily: playfair,
              fontSize: 64,
              fontWeight: 900,
              color: "#1a0f04",
              lineHeight: 1,
            }}
          >
            100g
          </span>
        </div>
      </div>

      {/* Smoothness badge - top right */}
      <div
        style={{
          position: "absolute",
          right: 50,
          bottom: 280,
          opacity: smoothOpacity,
          transform: `scale(${0.7 + smoothSpring * 0.3})`,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "rgba(255,248,231,0.95)",
            borderRadius: 24,
            padding: "24px 32px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            border: "3px solid #f5c45e",
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 18,
              fontWeight: 800,
              color: "#7a4a08",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            Silky Smooth
          </span>
          <span
            style={{
              fontFamily: playfair,
              fontSize: 44,
              fontWeight: 700,
              color: "#2d1808",
              lineHeight: 1.1,
            }}
          >
            Honey Glow
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 3: BOLD PRICE GRID (225-330 frames) ============ */
function Scene3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Big price card
  const priceSpring = spring({ frame: frame - 5, fps, config: { damping: 11, stiffness: 130 } });
  const priceOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" });

  // Soap product small
  const soapOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const soapY = interpolate(frame, [20, 45], [40, 0], { extrapolateRight: "clamp" });

  // Grid cells stagger
  const cells = [
    { label: "Price", value: "348", unit: "KSh", big: true },
    { label: "Size", value: "100", unit: "g" },
    { label: "Honey", value: "Pure", unit: "Infused" },
    { label: "Skin", value: "All", unit: "Types" },
  ];

  // Pulse for big price
  const pulse = 1 + Math.sin(frame * 0.15) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a0f04 0%, #2d1808 50%, #1a0f04 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Honey drip accent at top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80 }}>
        <HoneyDrips frame={frame} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "100px 60px",
          gap: 30,
        }}
      >
        {/* Soap thumb */}
        <div style={{ opacity: soapOpacity, transform: `translateY(${soapY}px)` }}>
          <Img
            src={staticFile("images/soap-honey.png")}
            style={{ width: 300, height: 300, objectFit: "contain", filter: "drop-shadow(0 10px 30px rgba(245,196,94,0.5))" }}
          />
        </div>

        <h2
          style={{
            fontFamily: playfair,
            fontSize: 42,
            fontStyle: "italic",
            color: "#f5c45e",
            margin: 0,
            opacity: soapOpacity,
            textAlign: "center",
          }}
        >
          Anatic Herbal Essence Soap
        </h2>

        {/* 2x2 GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 16,
            width: "100%",
            maxWidth: 960,
            marginTop: 10,
          }}
        >
          {cells.map((c, i) => {
            const cellSpring = spring({ frame: frame - (15 + i * 8), fps, config: { damping: 13, stiffness: 150 } });
            const cellOp = interpolate(frame, [15 + i * 8, 35 + i * 8], [0, 1], { extrapolateRight: "clamp" });
            const isBig = c.big;
            return (
              <div
                key={c.label}
                style={{
                  gridColumn: isBig ? "1 / span 2" : undefined,
                  opacity: cellOp,
                  transform: `scale(${0.85 + cellSpring * 0.15}) ${isBig ? `scale(${pulse})` : ""}`,
                  background: isBig
                    ? "linear-gradient(135deg, #f5c45e 0%, #e0a830 50%, #b87810 100%)"
                    : "rgba(255,248,231,0.08)",
                  border: isBig ? "4px solid #fff8e7" : "2px solid rgba(245,196,94,0.5)",
                  borderRadius: 28,
                  padding: isBig ? "40px 50px" : "32px 40px",
                  textAlign: "center",
                  boxShadow: isBig
                    ? "0 20px 60px rgba(245,196,94,0.5), inset 0 2px 20px rgba(255,255,255,0.3)"
                    : "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: isBig ? 28 : 20,
                    fontWeight: 800,
                    color: isBig ? "#1a0f04" : "#f5c45e",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginBottom: isBig ? 12 : 8,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontFamily: playfair,
                    fontSize: isBig ? 160 : 56,
                    fontWeight: 900,
                    color: isBig ? "#1a0f04" : "#fff8e7",
                    lineHeight: 0.95,
                    textShadow: isBig ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
                  }}
                >
                  {c.value}
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: isBig ? 44 : 24,
                    fontWeight: 800,
                    color: isBig ? "#1a0f04" : "#e8d5a8",
                    marginTop: 4,
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.unit}
                </div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: inter,
            fontSize: 24,
            fontWeight: 600,
            color: "#f5c45e",
            marginTop: 10,
            opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          BF Suma Kenya
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ Main ============ */
export function MainVideo() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={75}>
        <Scene1 />
      </Sequence>
      <Sequence from={75} durationInFrames={150}>
        <Scene2 />
      </Sequence>
      <Sequence from={225} durationInFrames={105}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
}
