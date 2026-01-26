import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CinematicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "xl";
  className?: string;
}

const CinematicButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  size = "default",
  className = ""
}: CinematicButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-full font-semibold overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-100"
        style={{
          background: variant === "primary"
            ? "linear-gradient(135deg, #ec4899, #f97316, #ec4899)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6, #6366f1)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 blur-xl opacity-0"
        style={{
          background: variant === "primary"
            ? "radial-gradient(circle, rgba(236,72,153,0.8), transparent)"
            : "radial-gradient(circle, rgba(99,102,241,0.8), transparent)",
        }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 text-white flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default CinematicButton;
