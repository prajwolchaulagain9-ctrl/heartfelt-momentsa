import { motion } from "framer-motion";

const DepthOfFieldOverlay = () => {
  return (
    <>
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      
      {/* Cinematic bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-16 bg-black z-30 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-black z-30 pointer-events-none"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
        }}
      />
      
      {/* Film grain effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
    </>
  );
};

export default DepthOfFieldOverlay;
