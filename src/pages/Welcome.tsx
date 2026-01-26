import { motion } from "framer-motion";
import { Heart, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import RomanticGifBackdrop from "@/components/RomanticGifBackdrop";
import CinematicLightRays from "@/components/CinematicLightRays";
import ParticleField from "@/components/ParticleField";
import InteractiveGlow from "@/components/InteractiveGlow";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <>
      <FloatingHearts />
      <ParticleField />
      <CinematicLightRays />
      <InteractiveGlow color="rgba(255,192,203,0.3)" intensity={1} />
      <RomanticGifBackdrop
        src="https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif"
        opacity={0.28}
        blur={2}
        overlayColor="linear-gradient(180deg, rgba(255,192,203,0.35), rgba(255,255,255,0.2))"
      />
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-200 via-transparent to-purple-200 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-2xl w-full space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top decoration */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-8 h-8 text-pink-500" />
            </motion.div>
            <motion.div variants={floatVariants} initial="initial" animate="animate">
              <Heart className="w-8 h-8 text-red-500" />
            </motion.div>
            <motion.div variants={floatVariants} initial="initial" animate="animate">
              <Sparkles className="w-8 h-8 text-pink-500" />
            </motion.div>
          </motion.div>

          {/* Main title */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
              A Heartfelt Moment
            </h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-pink-500 to-rose-400 mx-auto"
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>

          {/* Subtitle with typing effect */}
          <motion.p
            variants={itemVariants}
            className="text-center text-lg md:text-xl text-gray-700 max-w-lg mx-auto leading-relaxed"
          >
            Awaits you with gentle excitement and romantic surprises
          </motion.p>

          {/* Features grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 my-8"
          >
            {[
              { icon: "💝", label: "Heartfelt" },
              { icon: "✨", label: "Romantic" },
              { icon: "💕", label: "Personal" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm border border-pink-200 hover:border-pink-500 transition-all"
                whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)" }}
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <p className="text-sm font-semibold text-gray-700">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={pulseVariants}
              animate="pulse"
            >
              <Button
                variant="romantic"
                size="xl"
                onClick={() => navigate("/begin")}
                className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                <motion.span className="flex items-center gap-2">
                  Begin the Moment
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  >
                    💕
                  </motion.span>
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            className="flex justify-center gap-6 pt-8"
            variants={itemVariants}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-5 h-5 text-pink-400 opacity-60" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Welcome;
