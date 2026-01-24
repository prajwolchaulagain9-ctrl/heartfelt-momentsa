import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoShowcaseProps {
  onComplete: () => void;
}

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    praise: "Your kindness lights every room",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    praise: "That smile softens every day",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    praise: "You carry grace without trying",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    praise: "Every ordinary moment feels golden with you",
  },
];

const PhotoShowcase = ({ onComplete }: PhotoShowcaseProps) => {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);

  useEffect(() => {
    photos.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, index]);
      }, index * 500);
      return () => clearTimeout(timer);
    });
  }, []);

  const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, y: 60, rotate: -15 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
        delay: i * 0.15,
      },
    }),
    hover: {
      scale: 1.08,
      y: -15,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>
          ))}
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          How I See You
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A tiny glimpse of you through my eyes—every photo is a love letter to who you are.
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            custom={index}
            initial="hidden"
            animate={visiblePhotos.includes(index) ? "visible" : "hidden"}
            whileHover="hover"
            variants={photoVariants}
            className="relative group"
          >
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-romantic bg-white/80 backdrop-blur-sm border border-white/60 h-96">
              {/* Image */}
              <motion.img
                src={photo.url}
                alt={photo.praise}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.6 }}
              />

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Praise Text */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  visiblePhotos.includes(index)
                    ? { y: 0, opacity: 1 }
                    : { y: 20, opacity: 0 }
                }
                transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
              >
                <p className="text-xl font-serif font-semibold drop-shadow-lg">
                  {photo.praise}
                </p>
              </motion.div>

              {/* Sparkle decoration */}
              <motion.div
                className="absolute top-4 right-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  visiblePhotos.includes(index)
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -180 }
                }
                transition={{ delay: (index + 1) * 0.1, type: "spring" as const, bounce: 0.5 }}
              >
                <motion.div
                  animate={{
                    y: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-glow" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing Message & Button */}
      <motion.div
        className="mt-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-romantic px-8 py-8 border border-white/60 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={
          visiblePhotos.length === photos.length
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex justify-center gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </motion.div>
          ))}
        </motion.div>
        <p className="text-lg text-slate-700 mb-6 text-center font-serif">
          You’re extraordinary in quiet and loud ways alike. Now, there’s one more thing I want to ask you...
        </p>
        <div className="flex justify-center">
          <Button variant="romantic" size="lg" onClick={onComplete}>
            Take me to your question
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoShowcase;
