import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CursorTrail = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail((prev) => [...prev.slice(-10), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            background: `rgba(255, 192, 203, ${0.6 - index * 0.05})`,
            boxShadow: "0 0 10px rgba(255, 192, 203, 0.5)",
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
