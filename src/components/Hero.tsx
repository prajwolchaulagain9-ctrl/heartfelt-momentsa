import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode; // CTA or extra content
}

const Hero = ({ title, subtitle, children }: HeroProps) => {
  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-rose-light/30 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/5 right-1/6 w-96 h-96 rounded-full bg-gold-light/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass frame for hero content */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="z-10 w-full"
      >
        <div className="container max-w-xl mx-auto py-12 sm:py-16">
          <div className="relative rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-romantic px-6 sm:px-8 py-10 sm:py-12">
            <div className="absolute -top-10 -left-10 hidden sm:block w-24 h-24 rounded-full bg-rose-light/40 blur-xl" />
            <div className="absolute -bottom-12 -right-12 hidden sm:block w-32 h-32 rounded-full bg-gold-light/30 blur-xl" />

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              className="type-display text-gradient-romantic mb-3"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
                className="type-subtitle text-muted-foreground mb-8"
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTA */}
            {children && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex justify-center"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default Hero;
