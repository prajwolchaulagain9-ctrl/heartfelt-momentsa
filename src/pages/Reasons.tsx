import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
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

interface GiftBoxProps {
  reason: typeof reasons[0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
}

const GiftBox = ({ reason, index, isOpen, onClick }: GiftBoxProps) => {
  const Icon = reason.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <motion.div
        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg transition-all ${
          isOpen
            ? "bg-gradient-romantic shadow-romantic"
            : "bg-gradient-to-br from-red-400 to-red-600 shadow-lg hover:shadow-2xl"
        }`}
        whileHover={{ scale: isOpen ? 1 : 1.05, rotate: isOpen ? 0 : 2 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen ? (
          <>
            {/* Closed gift box */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </motion.div>
            {/* Ribbon */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-300 transform -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-yellow-300 transform -translate-x-1/2" />
          </>
        ) : (
          <>
            {/* Opened gift box content */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-3"
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
              <p className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                {reason.title}
              </p>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Expanded content below box when opened */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
            {reason.text}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const Reasons = () => {
  const navigate = useNavigate();
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);

  const handleBoxClick = (index: number) => {
    if (!openedBoxes.includes(index)) {
      setOpenedBoxes([...openedBoxes, index]);
    }
  };

  const allBoxesOpened = openedBoxes.length === reasons.length;

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />
      <ParticleField />
      <CinematicLightRays />
      <InteractiveGlow color="rgba(255,200,210,0.4)" intensity={1.1} />
      <RomanticGifBackdrop
        src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyM2FqdjV6MGpybDd5bnh3c21nZ25yc2JweHNsbXhoOTlhaTFkZmRqNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HSCZMUa1ao17h7l5mg/giphy.gif"
        opacity={0.22}
        blur={1}
        overlayColor="linear-gradient(160deg, rgba(255,200,210,0.35), rgba(255,240,230,0.2))"
      />

      <div className="text-center z-10 w-full">
        <div className="container max-w-3xl mx-auto py-12 sm:py-16 px-4">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic mb-2"
          >
            Open Your Surprises
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-12 text-sm sm:text-base"
          >
            Click each gift to discover why I love you ✨
          </motion.p>

          {/* Gift boxes grid */}
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 mb-12 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {reasons.map((reason, index) => (
              <GiftBox
                key={index}
                reason={reason}
                index={index}
                isOpen={openedBoxes.includes(index)}
                onClick={() => handleBoxClick(index)}
              />
            ))}
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2">
              {reasons.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    openedBoxes.includes(index)
                      ? "bg-rose-500 w-3"
                      : "bg-rose-200 w-2"
                  }`}
                  layoutId={`dot-${index}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Final message and button */}
          {allBoxesOpened && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-romantic px-6 py-8 border border-white/60"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gradient-romantic font-semibold mb-4"
              >
                Even if the universe ever collapsed, my reasons to love you would never end.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-slate-700 mb-6"
              >
                And finally... can I ask you something?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Button
                  variant="romantic"
                  size="lg"
                  onClick={() => navigate("/question")}
                >
                  Yes
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/question")}
                >
                  Definitely yes
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Reasons;
