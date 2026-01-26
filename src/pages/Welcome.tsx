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
    <main className="relative min-h-screen bg-gradient-dreamy text-foreground">
      <FloatingHearts />
      {/* Slightly toned-down effects for mobile battery/perf */}
      <ParticleField />
      <CinematicLightRays />
      <InteractiveGlow color="rgba(255,192,203,0.25)" intensity={0.85} />
      <RomanticGifBackdrop
        src="https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif"
        opacity={0.28}
        blur={2}
        overlayColor="linear-gradient(180deg, rgba(255,192,203,0.35), rgba(255,255,255,0.2))"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/60 via-white/10 to-purple-100/40" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-10">
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 rounded-[28px] bg-white/35 backdrop-blur-xl shadow-[0_20px_60px_-18px_rgba(0,0,0,0.22)]"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
        />

        <motion.div
          className="relative z-10 w-full space-y-8 sm:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="presentation"
        >
          <header className="flex flex-col items-center text-center space-y-6">
            <motion.div className="flex items-center justify-center gap-4" variants={itemVariants}>
              {[Sparkles, Heart, Sparkles].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  aria-hidden="true"
                >
                  <Icon className="h-8 w-8 text-pink-500" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 px-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur sm:text-sm">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Crafted with love & care
              </p>
              <div className="space-y-3">
                <h1 className="text-balance text-4xl font-bold leading-tight text-transparent sm:text-5xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400 bg-clip-text">
                  A Heartfelt Moment
                </h1>
                <motion.div
                  className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <motion.p
                variants={itemVariants}
                className="text-balance text-base text-muted-foreground sm:text-lg max-w-xl mx-auto leading-relaxed px-2"
              >
                Awaits you with gentle excitement and romantic surprises designed to make every heartbeat feel special.
              </motion.p>
            </motion.div>
          </header>

          <section aria-label="Highlights" className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {[{ icon: "💝", label: "Heartfelt" }, { icon: "✨", label: "Romantic" }, { icon: "💕", label: "Personal" }].map((item) => (
                <motion.article
                  key={item.label}
                  className="flex h-full flex-col items-center rounded-2xl border border-white/50 bg-white/65 px-4 py-5 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
                  whileHover={{ y: -6, boxShadow: "0 16px 44px rgba(236, 72, 153, 0.18)" }}
                  role="presentation"
                >
                  <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-3 text-sm font-semibold text-foreground sm:text-base">{item.label}</p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section aria-label="Begin journey" className="pt-2">
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={pulseVariants}
                animate="pulse"
              >
                <Button
                  variant="romantic"
                  size="xl"
                  aria-label="Begin the heartfelt journey"
                  onClick={() => navigate("/begin")}
                  className="px-10 py-5 text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
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
          </section>

          <section aria-label="Animated hearts" className="pt-2 pb-4">
            <motion.div
              className="flex justify-center gap-6"
              variants={itemVariants}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <Heart className="w-5 h-5 text-pink-400 opacity-70" />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default Welcome;
