import React, { useMemo } from "react"
import { Heart, Star, Sparkles, Users, Zap, Gem, Slack } from "lucide-react"

const ICONS = [Heart]//, Star, Sparkles, Slack]

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const ICON_COUNT = typeof window !== "undefined"
  ? Math.max(6, Math.floor(window.innerWidth / 100))
  : 12

export default function FallingIconsBackground() {
  // Memoize icon configs so they don't change on rerender
  const icons = useMemo(() => {
    return Array.from({ length: ICON_COUNT }).map(() => {
      const Icon = ICONS[getRandomInt(0, ICONS.length - 1)]
      // Random horizontal movement: -100px to +100px
      const horizontalShift = getRandomInt(-100, 100)
      return {
        Icon,
        left: `${getRandomInt(0, 95)}vw`,
        size: getRandomInt(24, 48),
        color: `#f7af88`,
        delay: getRandomInt(0, 4000),
        duration: getRandomInt(6000, 12000),
        opacity: Math.random() * 0.5 + 0.3,
        horizontalShift,
      }
    })
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      {icons.map((icon, idx) => (
        <span
          key={idx}
          style={{
            position: "absolute",
            left: icon.left,
            top: "-60px",
            opacity: icon.opacity,
            animation: `fallingIcon-${idx} ${icon.duration}ms linear ${icon.delay}ms infinite`,
            zIndex: 0,
          }}
        >
          <icon.Icon
            style={{ color: icon.color }}
            width={icon.size}
            height={icon.size}
          />
          <style>{`
            @keyframes fallingIcon-${idx} {
              0% {
                transform: translateY(0) translateX(0);
                opacity: ${icon.opacity};
              }
              80% {
                opacity: ${icon.opacity};
              }
              100% {
                transform: translateY(100vh) translateX(${icon.horizontalShift}px);
                opacity: 0;
              }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
}
