import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxContainer = ({ children, speed = 0.5, className = "" }: ParallaxContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxContainer;
