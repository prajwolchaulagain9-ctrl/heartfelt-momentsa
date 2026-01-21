import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const isMobile = window.innerWidth < 640;
      const count = isMobile ? 12 : 22;
      const newHearts: HeartParticle[] = [];
      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 7 + Math.random() * 7,
          size: isMobile ? 10 + Math.random() * 18 : 12 + Math.random() * 24,
          opacity: 0.25 + Math.random() * 0.45,
        });
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -window.innerHeight - 120],
            x: [0, Math.sin(heart.id * 0.6) * 50],
            rotate: [0, 240, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={heart.size}
            className="text-primary fill-primary"
            style={{ opacity: heart.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
