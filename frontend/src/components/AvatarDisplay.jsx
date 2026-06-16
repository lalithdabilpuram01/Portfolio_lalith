import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Derive the image URL from portfolio personal config
function resolvePhotoSrc(personal) {
  const src = personal?.avatar_source || "generated";

  if (src === "github") {
    const ghUrl = personal?.social?.github?.url || "";
    const username = ghUrl
      .replace(/https?:\/\/github\.com\//, "")
      .replace(/\/$/, "")
      .split("/")[0];
    if (username && username !== "yourusername") {
      return `https://github.com/${username}.png?size=400`;
    }
    return null;
  }

  if (src === "photo" && personal?.photo) {
    const p = personal.photo;
    return p.startsWith("http") ? p : `/static/${p}`;
  }

  return null; // "generated" → SVG avatar
}

export default function AvatarDisplay({ personal }) {
  const name = personal?.name || "";
  const style = personal?.avatar_style || "neon"; // "neon" | "clean"
  const photoSrc = resolvePhotoSrc(personal);
  const isNeon = style === "neon";

  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ── 3D mouse-tracking tilt ────────────────────────────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
    stiffness: 260,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 260,
    damping: 26,
  });
  const glareX = useTransform(mouseX, [0, 1], ["-40%", "140%"]);
  const glareY = useTransform(mouseY, [0, 1], ["-40%", "140%"]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const { left, top, width, height } =
        cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    },
    [mouseX, mouseY]
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovering(false);
  }, [mouseX, mouseY]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AI";

  // effective photo (fall back to generated if GitHub img fails to load)
  const effectiveSrc = !imgError ? photoSrc : null;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 230, height: 230, perspective: "900px" }}
    >
      {/* ── Morphing neon blob glow (neon mode only) ──────────────── */}
      {isNeon && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: -30,
            background:
              "linear-gradient(135deg,rgba(0,255,136,0.26),rgba(34,211,238,0.16),rgba(168,85,247,0.26))",
            animation: "morph 9s ease-in-out infinite",
            filter: "blur(28px)",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Clean-mode soft glow ──────────────────────────────────── */}
      {!isNeon && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: -16,
            background: "radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Outer rotating dashed ring (neon only) ────────────────── */}
      {isNeon && (
        <svg
          className="absolute avatar-ring pointer-events-none"
          style={{
            inset: -14,
            width: "calc(100% + 28px)",
            height: "calc(100% + 28px)",
            zIndex: 1,
          }}
          viewBox="0 0 258 258"
        >
          <defs>
            <linearGradient id="outerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#00ff88" stopOpacity="0.9" />
              <stop offset="40%"  stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="80%"  stopColor="#a855f7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle
            cx="129" cy="129" r="120"
            fill="none"
            stroke="url(#outerRingGrad)"
            strokeWidth="2"
            strokeDasharray="14 9"
          />
        </svg>
      )}

      {/* ── Inner counter-rotating ring (neon only) ───────────────── */}
      {isNeon && (
        <svg
          className="absolute avatar-ring-rev pointer-events-none"
          style={{
            inset: 8,
            width: "calc(100% - 16px)",
            height: "calc(100% - 16px)",
            zIndex: 1,
          }}
          viewBox="0 0 214 214"
        >
          <defs>
            <linearGradient id="innerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="107" cy="107" r="100"
            fill="none"
            stroke="url(#innerRingGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 11"
          />
        </svg>
      )}

      {/* ── Clean-mode single solid ring ──────────────────────────── */}
      {!isNeon && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: 8,
            border: "1.5px solid rgba(0,255,136,0.35)",
            zIndex: 1,
          }}
        />
      )}

      {/* ── 3D tilt + float card ──────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        className="relative rounded-full overflow-hidden"
        style={{
          width: 190,
          height: 190,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          zIndex: 10,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
        whileHover={{ scale: 1.035 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
      >
        {/* Photo (GitHub DP / uploaded photo) */}
        {effectiveSrc ? (
          <img
            src={effectiveSrc}
            alt={name}
            className="w-full h-full object-cover"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <GeneratedAvatar initials={initials} />
        )}

        {/* Scan-line texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,136,0.025) 3px,rgba(0,255,136,0.025) 4px)",
          }}
        />

        {/* Glitch layers — hover + neon mode + photo present */}
        {isHovering && isNeon && effectiveSrc && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${effectiveSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "hue-rotate(90deg)",
                clipPath: "inset(15% 0 55% 0)",
                animation: "glitch1 1.4s steps(1) infinite",
                opacity: 0.4,
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${effectiveSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "hue-rotate(210deg)",
                clipPath: "inset(58% 0 8% 0)",
                animation: "glitch2 1.8s steps(1) infinite",
                opacity: 0.3,
                mixBlendMode: "screen",
              }}
            />
          </>
        )}

        {/* Moving glare highlight */}
        {isHovering && (
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "60%",
              height: "60%",
              top: glareY,
              left: glareX,
              background:
                "radial-gradient(circle,rgba(255,255,255,0.14) 0%,transparent 70%)",
              transform: "translate(-50%,-50%)",
            }}
          />
        )}

        {/* Neon inner glow border */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: isNeon
              ? "inset 0 0 25px rgba(0,255,136,0.18), 0 0 40px rgba(0,255,136,0.28)"
              : "inset 0 0 12px rgba(0,255,136,0.08)",
          }}
        />
      </motion.div>

      {/* Source label (small, below avatar) */}
      {personal?.avatar_source === "github" && effectiveSrc && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-slate-600 text-xs">via GitHub</span>
        </div>
      )}
    </div>
  );
}

function GeneratedAvatar({ initials }) {
  return (
    <div className="w-full h-full bg-bg-secondary flex items-center justify-center relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 190 190">
        <g stroke="#00ff88" strokeWidth="0.6" fill="none">
          <circle cx="95" cy="95" r="45" />
          <circle cx="95" cy="95" r="28" />
          <line x1="95" y1="10" x2="95" y2="180" />
          <line x1="10" y1="95" x2="180" y2="95" />
          <line x1="32" y1="32" x2="158" y2="158" />
          <line x1="158" y1="32" x2="32" y2="158" />
          <circle cx="95" cy="50" r="5" fill="#00ff88" />
          <circle cx="95" cy="140" r="5" fill="#22d3ee" />
          <circle cx="50" cy="95" r="5" fill="#a855f7" />
          <circle cx="140" cy="95" r="5" fill="#00ff88" />
          <circle cx="58" cy="58" r="4" fill="#22d3ee" opacity="0.7" />
          <circle cx="132" cy="132" r="4" fill="#a855f7" opacity="0.7" />
          <circle cx="132" cy="58" r="4" fill="#00ff88" opacity="0.7" />
          <circle cx="58" cy="132" r="4" fill="#22d3ee" opacity="0.7" />
        </g>
      </svg>
      <motion.span
        className="font-orbitron font-black text-4xl gradient-text relative z-10"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {initials}
      </motion.span>
    </div>
  );
}
