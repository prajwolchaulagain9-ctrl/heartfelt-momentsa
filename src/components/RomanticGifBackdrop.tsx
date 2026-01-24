import { motion } from "framer-motion";

interface RomanticGifBackdropProps {
  src: string;
  opacity?: number;
  blur?: number;
  overlayColor?: string;
  className?: string;
}

const RomanticGifBackdrop = ({
  src,
  opacity = 0.5,
  blur = 0,
  overlayColor,
  className = "",
}: RomanticGifBackdropProps) => (
  <motion.div
    className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    aria-hidden
  >
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: blur ? `blur(${blur}px)` : undefined,
        mixBlendMode: "screen",
      }}
      animate={{ scale: [1, 1.04, 1], rotate: [0, 0.5, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    {overlayColor && (
      <div
        className="absolute inset-0"
        style={{ background: overlayColor, mixBlendMode: "soft-light" }}
      />
    )}
  </motion.div>
);

export default RomanticGifBackdrop;
