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
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/622647849_2499634570432038_8263838319862653837_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_ohc=RaVe4h2P3x4Q7kNvwGzzR6N&_nc_oc=Adki1M6lmmB1rKVMYXyD9G0slsJlresdOj9_wgQ-84nyWb51I2mKh6m6j6kcOyyhiTzKsjp4xuTYAvvVZZW_48_Q&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gHOGMOMoCa_lyT6ZbX47vw7fNi06BgJJqRvu6e5klIjbQ&oe=69A80CDF",
    praise: "Your beauty shines from within",
  },
  {
    id: 2,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/619251981_785952424515798_7570970355521022386_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_ohc=esnsn0IfFo8Q7kNvwG4wVBS&_nc_oc=AdkA_M_unTgIU1LkpPoHD9huyC7xlwGB_XzhnMjTqiRhiToCRpv-AYnuJ0MAUTKRId5jphp4XMAhgDe5QKb_IupJ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gFt_JkMVod6JGLfXWLJGyhshL5tkIfYoSmbp97nxJTwag&oe=69A8285E",
    praise: "That smile takes my breath away",
  },
  {
    id: 3,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/624278459_1227251148746712_1618744897501690900_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=XYbVIuLj5ycQ7kNvwH1fsJ8&_nc_oc=AdmEfGqsdvpifkd8DpuYRexolzoHqfKU1zSgtlHqDQ_tmVSGebDAin0heyvJd3oI8FY9Z7IWY87Hol6x_kyIk-E1&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gF3vIr5RxWNoBken-EyP6EpmqcyWi25z9siUdEQ5xJWmQ&oe=69A82100",
    praise: "Your grace mesmerizes me",
  },
  {
    id: 4,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/620637700_1572543807533655_6255011560553014012_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=48oRdPFoTWMQ7kNvwG97bJa&_nc_oc=Admjxze_j5eSwSApiMSftIOLfcd5cVjNhFfKOlYMAAiA43CHs-R1NuMLFdvOfPXbV3fB4CNKtwjLAZ3NC-Cuzuy-&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gHe4Q5-EURDCLTiRh0P2pu3r5UUKYXeOFSPPQ05r5p50Q&oe=69A82389",
    praise: "Every moment with you is pure magic",
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
