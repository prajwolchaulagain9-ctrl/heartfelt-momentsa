import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";

const messages = [
  "Every moment with you feels like magic...",
  "You came into my life unexpectedly...",
  "And suddenly, everything made sense.",
];

const Begin = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Animated background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 30}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 w-full">
        <div className="container max-w-2xl mx-auto py-12 sm:py-16">
        {/* Messages appearing one by one */}
        <div className="space-y-6 mb-12">
          {messages.map((message, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                delay: index * 1.2, 
                duration: 0.8,
                ease: "easeOut"
              }}
              className={`text-2xl md:text-3xl font-serif ${
                index === 2 ? "text-gradient-romantic font-semibold" : "text-foreground"
              }`}
            >
              {message}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
          <Sparkles className="w-5 h-5 text-gold" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="text-muted-foreground mb-8 text-sm sm:text-base"
        >
          Let me tell you why you're so special...
        </motion.p>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.5 }}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="romantic" size="xl" onClick={() => navigate("/reasons")}>
            Continue
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

export default Begin;
