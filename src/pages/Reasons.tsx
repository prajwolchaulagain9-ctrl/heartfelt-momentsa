import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Star } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import RomanticGifBackdrop from "@/components/RomanticGifBackdrop";
import ParticleField from "@/components/ParticleField";
import InteractiveGlow from "@/components/InteractiveGlow";
import CinematicLightRays from "@/components/CinematicLightRays";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Star,
    title: "Your Smile",
    text: "The way you smile lights up my entire world. It's like watching the sun rise for the first time, every single time.",
  },
  {
    icon: Heart,
    title: "Your Heart",
    text: "Your kindness knows no bounds. The way you care for others makes me fall for you deeper every day.",
  },
  {
    icon: Sparkles,
    title: "Your Soul",
    text: "Your soul is the rarest kind of beautiful. You don't just make me happy, you make me want to be better.",
  },
  {
    icon: Star,
    title: "Your Laugh",
    text: "Your laughter is my favorite melody. It echoes in my heart long after the moment has passed.",
  },
  {
    icon: Heart,
    title: "Your Eyes",
    text: "I could get lost in your eyes forever. They hold galaxies I never knew I wanted to explore.",
  },
];

const Reasons = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < reasons.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentReason = reasons[currentIndex];
  const Icon = currentReason.icon;
  const isLast = currentIndex === reasons.length - 1;

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />
      <ParticleField />
      <CinematicLightRays />
      <InteractiveGlow color="rgba(255,200,210,0.4)" intensity={1.1} />
      <RomanticGifBackdrop
        src="https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif"
        opacity={0.22}
        blur={1}
        overlayColor="linear-gradient(160deg, rgba(255,200,210,0.35), rgba(255,240,230,0.2))"
      />

      <div className="text-center z-10 w-full">
        <div className="container max-w-xl mx-auto py-12 sm:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-romantic shadow-romantic mb-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentReason.title}
            </motion.h2>

            {/* Text */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentReason.text}
            </motion.p>

            {isLast && (
              <motion.p
                className="text-lg md:text-xl text-gradient-romantic font-semibold"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Even if the universe ever collapsed, my reasons to love you would never end.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
        {isLast && (
          <motion.div
            className="mt-10 bg-white/70 backdrop-blur-sm rounded-2xl shadow-romantic px-6 py-5 border border-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-base md:text-lg text-slate-700 mb-4">
              And finally... can I ask you something?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="romantic" size="lg" onClick={() => navigate("/question")}>Yes</Button>
              <Button variant="secondary" size="lg" onClick={() => navigate("/question")}>Definitely yes</Button>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </main>
  );
};

export default Reasons;
