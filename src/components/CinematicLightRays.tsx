import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CinematicLightRays = () => {
  const rays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    delay: i * 0.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            width: "150%",
            height: "2px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)",
            transform: `rotate(${ray.angle}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            delay: ray.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default CinematicLightRays;
