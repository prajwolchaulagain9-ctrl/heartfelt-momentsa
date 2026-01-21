import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Quote, ArrowRight } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";

const Feelings = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Soft glowing background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-rose-light/20 via-transparent to-gold-light/10"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center z-10 w-full">
        <div className="container max-w-3xl mx-auto py-12 sm:py-16">
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <Quote className="w-12 h-12 text-gold mx-auto rotate-180" />
        </motion.div>

        {/* Main quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-foreground leading-relaxed mb-6"
        >
          In a world full of temporary things,{" "}
          <motion.span 
            className="text-gradient-romantic font-semibold not-italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            you are my forever
          </motion.span>
          .
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-lg md:text-xl font-serif text-foreground mb-4"
        >
          My heart knew you before my eyes ever saw you.
        </motion.p>

        {/* Heartbeat animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="flex justify-center my-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-16 h-16 text-primary fill-primary drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-sm sm:text-base text-muted-foreground mb-8"
        >
          And now, there's something I've been meaning to ask you...
        </motion.p>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="romantic" size="xl" onClick={() => navigate("/question")}>
            I'm Ready
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Button>
        </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Feelings;
