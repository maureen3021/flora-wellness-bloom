import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  staticFile,
  Img,
  Sequence,
  Series,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadFont2 } from "@remotion/google-fonts/Inter";

const { fontFamily: playfair } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: inter } = loadFont2("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

/* ============ SCENE 1: Brand Intro (0-90 frames) ============ */
function Scene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });
  const brandScale = spring({ frame, fps, config: { damping: 20, stiffness: 150 } });

  const lineWidth = interpolate(frame, [25, 50], [0, 120], { extrapolateRight: "clamp" });

  const productOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateRight: "clamp" });
  const productY = interpolate(frame, [35, 65], [25, 0], { extrapolateRight: "clamp" });

  const descOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8faf5 0%, #eef4e8 100%)" }}>
      {/* Decorative floating bubbles */}
      <Bubble x={80} y={200} size={40} delay={0} frame={frame} />
      <Bubble x={900} y={400} size={60} delay={5} frame={frame} />
      <Bubble x={150} y={700} size={35} delay={10} frame={frame} />
      <Bubble x={850} y={900} size={50} delay={15} frame={frame} />
      <Bubble x={500} y={1200} size={45} delay={8} frame={frame} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            opacity: brandOpacity,
            transform: `translateY(${brandY}px) scale(${0.9 + brandScale * 0.1})`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "0.35em",
              color: "#5a7a3a",
              textTransform: "uppercase",
            }}
          >
            BF SUMA
          </span>
        </div>

        <div
          style={{
            width: lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #7a9e4f, transparent)",
            margin: "20px 0",
          }}
        />

        <div
          style={{
            opacity: productOpacity,
            transform: `translateY(${productY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: playfair,
              fontSize: 72,
              fontWeight: 700,
              color: "#2d3a1e",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Anatic
          </h1>
          <h2
            style={{
              fontFamily: playfair,
              fontSize: 48,
              fontWeight: 400,
              color: "#4a5e32",
              lineHeight: 1.2,
              margin: "8px 0 0 0",
            }}
          >
            Herbal Essence Soap
          </h2>
        </div>

        <p
          style={{
            opacity: descOpacity,
            fontFamily: inter,
            fontSize: 30,
            color: "#6b7f52",
            marginTop: 30,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Nature's gentle touch for your skin
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 2: Product Showcase (90-240 frames) ============ */
function Scene2() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFrame = frame; // relative to this sequence start

  // Soap image animations
  const soapScale = spring({
    frame: sceneFrame - 10,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1.5 },
  });
  const soapY = interpolate(sceneFrame, [0, 30], [100, 0], { extrapolateRight: "clamp" });
  const soapOpacity = interpolate(sceneFrame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Size label animations
  const sizeOpacity = interpolate(sceneFrame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const sizeX = interpolate(sceneFrame, [30, 55], [-40, 0], { extrapolateRight: "clamp" });

  // Smoothness label animations
  const smoothOpacity = interpolate(sceneFrame, [55, 80], [0, 1], { extrapolateRight: "clamp" });
  const smoothX = interpolate(sceneFrame, [55, 80], [40, 0], { extrapolateRight: "clamp" });

  // Glow pulse for smoothness
  const glowIntensity = interpolate(
    sceneFrame,
    [80, 100, 120, 140],
    [0, 1, 1, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Bottom info bar
  const barY = interpolate(sceneFrame, [90, 120], [80, 0], { extrapolateRight: "clamp" });
  const barOpacity = interpolate(sceneFrame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8faf5 0%, #eef4e8 100%)" }}>
      {/* Decorative elements */}
      <Bubble x={100} y={300} size={30} delay={0} frame={sceneFrame} />
      <Bubble x={900} y={600} size={45} delay={5} frame={sceneFrame} />
      <Bubble x={200} y={1100} size={35} delay={10} frame={sceneFrame} />
      <Bubble x={800} y={1400} size={40} delay={8} frame={sceneFrame} />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(sceneFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#5a7a3a",
            textTransform: "uppercase",
          }}
        >
          Discover the Difference
        </span>
      </div>

      {/* Soap product image */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: "50%",
          transform: `translateX(-50%) translateY(${soapY}px) scale(${0.85 + soapScale * 0.15})`,
          opacity: soapOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(122,158,79,${0.1 + glowIntensity * 0.15}) 0%, transparent 70%)`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}
        />
        <Img
          src={staticFile("images/soap.png")}
          style={{
            width: 480,
            height: 480,
            objectFit: "contain",
            position: "relative",
            zIndex: 2,
          }}
        />
      </div>

      {/* Size badge - left */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 900,
          opacity: sizeOpacity,
          transform: `translateX(${sizeX}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: 28,
            padding: "28px 36px",
            border: "1px solid rgba(122,158,79,0.25)",
            boxShadow: "0 8px 32px rgba(90,122,58,0.12)",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 600,
              color: "#5a7a3a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Generous Size
          </span>
          <span
            style={{
              fontFamily: playfair,
              fontSize: 42,
              fontWeight: 700,
              color: "#2d3a1e",
            }}
          >
            100g
          </span>
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              color: "#6b7f52",
              display: "block",
              marginTop: 4,
            }}
          >
            Full-size bar
          </span>
        </div>
      </div>

      {/* Smoothness badge - right */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 1050,
          opacity: smoothOpacity,
          transform: `translateX(${smoothX}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: 28,
            padding: "28px 36px",
            border: "1px solid rgba(122,158,79,0.25)",
            boxShadow: "0 8px 32px rgba(90,122,58,0.12)",
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 600,
              color: "#5a7a3a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Silky Smooth
          </span>
          <span
            style={{
              fontFamily: playfair,
              fontSize: 42,
              fontWeight: 700,
              color: "#2d3a1e",
            }}
          >
            Botanical
          </span>
          <span
            style={{
              fontFamily: inter,
              fontSize: 20,
              color: "#6b7f52",
              display: "block",
              marginTop: 4,
            }}
          >
            Rich, creamy lather
          </span>
        </div>
      </div>

      {/* Bottom benefits bar */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 50,
          right: 50,
          opacity: barOpacity,
          transform: `translateY(${barY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: 24,
            padding: "24px 40px",
            border: "1px solid rgba(122,158,79,0.2)",
          }}
        >
          {["Gentle Cleanse", "Herbal Soothing", "Daily Refresh"].map((text, i) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: interpolate(sceneFrame, [100 + i * 8, 120 + i * 8], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#7a9e4f",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: inter,
                  fontSize: 22,
                  color: "#4a5e32",
                  fontWeight: 500,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ============ SCENE 3: CTA / Price (240-330 frames) ============ */
function Scene3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFrame = frame;

  const bgOpacity = interpolate(sceneFrame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  const priceScale = spring({
    frame: sceneFrame - 15,
    fps,
    config: { damping: 12, stiffness: 120, mass: 1.2 },
  });

  const ctaOpacity = interpolate(sceneFrame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const ctaY = interpolate(sceneFrame, [40, 65], [30, 0], { extrapolateRight: "clamp" });

  const smallSoapOpacity = interpolate(sceneFrame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const smallSoapY = interpolate(sceneFrame, [10, 35], [50, 0], { extrapolateRight: "clamp" });

  // Subtle floating animation for the soap
  const floatY = Math.sin(sceneFrame * 0.08) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #2d3a1e 0%, #1a2410 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Decorative bubbles on dark bg */}
      <Bubble x={120} y={250} size={25} delay={0} frame={sceneFrame} dark />
      <Bubble x={880} y={450} size={40} delay={5} frame={sceneFrame} dark />
      <Bubble x={180} y={950} size={30} delay={10} frame={sceneFrame} dark />
      <Bubble x={800} y={1300} size={35} delay={8} frame={sceneFrame} dark />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 60px",
        }}
      >
        {/* Small soap image floating */}
        <div
          style={{
            opacity: smallSoapOpacity,
            transform: `translateY(${smallSoapY + floatY}px)`,
            marginBottom: 40,
          }}
        >
          <Img
            src={staticFile("images/soap.png")}
            style={{
              width: 280,
              height: 280,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Product name */}
        <h2
          style={{
            fontFamily: playfair,
            fontSize: 44,
            fontWeight: 400,
            color: "#b8d49a",
            margin: 0,
            opacity: interpolate(sceneFrame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Anatic Herbal Essence Soap
        </h2>

        {/* Price */}
        <div
          style={{
            marginTop: 30,
            transform: `scale(${0.7 + priceScale * 0.3})`,
            opacity: interpolate(sceneFrame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 28,
              color: "#8faa6e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Only
          </span>
          <div
            style={{
              fontFamily: playfair,
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1,
              margin: "12px 0",
            }}
          >
            348 KSh
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            marginTop: 50,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #7a9e4f, #5a7a3a)",
              borderRadius: 60,
              padding: "26px 70px",
              boxShadow: "0 12px 40px rgba(90,122,58,0.4)",
            }}
          >
            <span
              style={{
                fontFamily: inter,
                fontSize: 32,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.08em",
              }}
            >
              Order on WhatsApp
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            fontFamily: inter,
            fontSize: 22,
            color: "#7a8f5e",
            marginTop: 50,
            opacity: interpolate(sceneFrame, [60, 85], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          BF Suma Kenya • Premium Botanical Wellness
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ============ Bubble helper ============ */
function Bubble({
  x,
  y,
  size,
  delay,
  frame,
  dark = false,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  frame: number;
  dark?: boolean;
}) {
  const f = frame - delay;
  const float = Math.sin(f * 0.06) * 15;
  const opacity = interpolate(f, [0, 15, 100, 130], [0, 0.4, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        width: size,
        height: size,
        borderRadius: "50%",
        background: dark
          ? "radial-gradient(circle at 30% 30%, rgba(184,212,154,0.3), rgba(122,158,79,0.1))"
          : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(200,220,180,0.3))",
        opacity,
        border: dark ? "1px solid rgba(184,212,154,0.15)" : "1px solid rgba(255,255,255,0.5)",
      }}
    />
  );
}

/* ============ Main Video ============ */
export function MainVideo() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Scene1 />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <Scene2 />
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
}
