import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface InteractiveGlowProps {
  color?: string;
  intensity?: number;
}

const InteractiveGlow = ({ color = "rgba(255,192,203,0.4)", intensity = 1 }: InteractiveGlowProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        width: "600px",
        height: "600px",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${80 * intensity}px)`,
      }}
      animate={{
        x: mousePosition.x - 300,
        y: mousePosition.y - 300,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    />
  );
};

export default InteractiveGlow;
