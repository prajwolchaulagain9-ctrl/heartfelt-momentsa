import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Soft glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-rose-light/30 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-light/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center z-10 max-w-lg">
        {/* Envelope animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="w-32 h-24 bg-champagne rounded-lg shadow-romantic mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-champagne to-secondary" />
              <motion.div
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute top-2 left-1/2 -translate-x-1/2"
              >
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-rose-light/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-muted-foreground mb-4 font-medium"
        >
          You have a special message...
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif font-bold text-gradient-romantic mb-6"
        >
          Someone Wants to
          <br />
          <span className="italic">Tell You Something</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-muted-foreground mb-10 text-lg"
        >
          Take a moment, breathe, and when you're ready...
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/begin")}
          className="px-10 py-4 bg-gradient-romantic text-primary-foreground rounded-full text-lg font-semibold shadow-romantic hover:shadow-glow transition-all duration-300"
        >
          Open Your Heart 💕
        </motion.button>
      </div>
    </main>
  );
};

export default Welcome;
