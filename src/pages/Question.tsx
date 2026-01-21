import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, PartyPopper } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import CelebrationEffect from "@/components/CelebrationEffect";
import { Button } from "@/components/ui/button";

const Question = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<"yes" | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const [showMiniCongrats, setShowMiniCongrats] = useState(false);
  const targetScore = 10;
  const baseShuffleInterval = 1100;
  const minShuffleInterval = 550;

  const noMessages = [
    "No...",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Please? 🥺",
    "Pretty please?",
    "I'll be sad...",
    "💔",
  ];

  const shuffleHeart = () => {
    const newX = (Math.random() - 0.5) * 320;
    const newY = (Math.random() - 0.5) * 180;
    setHeartPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    if (!gameStarted || gameComplete) return;
    const intervalDuration = Math.max(
      minShuffleInterval,
      baseShuffleInterval - score * 60
    );
    const interval = setInterval(shuffleHeart, intervalDuration);
    return () => clearInterval(interval);
  }, [gameStarted, gameComplete, score]);

  const handleStartGame = () => {
    setScore(0);
    setGameComplete(false);
    setGameStarted(true);
    setShowMiniCongrats(false);
    shuffleHeart();
  };

  const handleHeartCatch = () => {
    setGameStarted(true);
    setScore((prev) => {
      const next = prev + 1;
      if (next >= targetScore) {
        setGameComplete(true);
        setShowMiniCongrats(true);
      } else {
        shuffleHeart();
      }
      return next;
    });
  };

  const handleProceedToQuestion = () => {
    setShowMiniCongrats(false);
  };

  const handleNoHover = () => {
    setNoAttempts((prev) => Math.min(prev + 1, noMessages.length - 1));
    const newX = (Math.random() - 0.5) * 250;
    const newY = (Math.random() - 0.5) * 150;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setAnswer("yes");
    // Trigger celebration event for background music
    window.dispatchEvent(new Event('celebrate'));
  };

  const progress = Math.min(score / targetScore, 1);

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Show confetti when answer is yes */}
      {answer === "yes" && <CelebrationEffect />}

      {/* Pulsing background */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          background: [
            "radial-gradient(circle at 50% 50%, hsl(350 60% 92% / 0.5) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, hsl(350 70% 85% / 0.6) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, hsl(350 60% 92% / 0.5) 0%, transparent 70%)",
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center z-10 w-full">
        <div className="container max-w-2xl mx-auto py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {!gameComplete ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <p className="uppercase tracking-[0.2em] text-sm text-muted-foreground">Warm-up game</p>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-gradient-romantic">Catch the Hearts</h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">Collect {targetScore} hearts to unlock the big question. Hearts get faster and roam wider the more you catch—stay sharp!</p>
              </motion.div>

              <div className="w-full max-w-3xl mx-auto space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Score: {score}/{targetScore}</span>
                  <span>{gameStarted ? "Chase the heart!" : "Tap start to begin"}</span>
                </div>

                <div className="relative h-64 rounded-3xl border border-white/50 bg-white/10 backdrop-blur-xl overflow-hidden shadow-romantic">
                  {!gameStarted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/10 backdrop-blur-sm">
                      <p className="text-muted-foreground">Catch the moving hearts to prove your love prowess.</p>
                      <Button variant="romantic" size="lg" onClick={handleStartGame}>
                        Start mini-game
                      </Button>
                    </div>
                  )}

                  {gameStarted && !gameComplete && (
                    <motion.button
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-3 shadow-glow"
                      onClick={handleHeartCatch}
                      animate={{
                        x: heartPosition.x,
                        y: heartPosition.y,
                        scale: [0.92, 1.08, 0.98],
                        rotate: [0, 10, -8, 0],
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-8 h-8 fill-primary-foreground" />
                    </motion.button>
                  )}
                </div>

                <div className="w-full h-3 rounded-full bg-white/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <motion.div
                  className="text-muted-foreground text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {score === 0 && "The heart is shy. Start the chase!"}
                  {score > 0 && score < targetScore / 2 && "Getting warmer… they’re speeding up."}
                  {score >= targetScore / 2 && score < targetScore && "Almost there! They won't stay still now."}
                  {score >= targetScore && "Unlocked! The question awaits."}
                </motion.div>
              </div>
            </motion.div>
          ) : showMiniCongrats ? (
            <motion.div
              key="mini-celebration"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.65, type: "spring", bounce: 0.35 }}
              className="space-y-8"
            >
              <motion.div
                className="flex justify-center gap-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -18, 0],
                      scale: [1, 1.12, 1],
                      rotate: [-8, 8, -8],
                    }}
                    transition={{ duration: 1.6, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-8 h-8 text-primary fill-primary drop-shadow-glow" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 14 }}
                className="space-y-4"
              >
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-gradient-romantic">Yay! You made it!</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your heart-catching skills are unmatched. Take a breath, then tap below to reveal the question waiting for you.</p>
              </motion.div>

              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", bounce: 0.35 }}
              >
                <motion.button
                  onClick={handleProceedToQuestion}
                  className="px-10 py-4 bg-gradient-romantic text-primary-foreground rounded-full text-lg font-semibold shadow-romantic hover:shadow-glow"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  Ask me the question
                </motion.button>
              </motion.div>

              <motion.div className="flex justify-center gap-3 text-gold">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, delay: 0.4 + i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : !answer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated hearts */}
              <motion.div className="flex justify-center gap-3 mb-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart
                      className={`fill-primary text-primary ${
                        i === 2 ? "w-10 h-10" : "w-6 h-6"
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* The question */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-gradient-romantic mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Will You Be
                <br />
                <motion.span 
                  className="italic"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  My Valentine?
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I promise to cherish every moment with you... 💕
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[100px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  animate={{ 
                    boxShadow: [
                      "0 10px 40px -10px hsl(350 80% 55% / 0.3)",
                      "0 10px 60px -10px hsl(350 80% 55% / 0.5)",
                      "0 10px 40px -10px hsl(350 80% 55% / 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button variant="romantic" size="xl" onClick={handleYes}>Yes! 💕</Button>
                </motion.div>

                <motion.button
                  className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full text-lg font-medium"
                  style={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  whileHover={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {noMessages[noAttempts]}
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              {/* Celebration burst */}
              <motion.div className="flex justify-center gap-4 mb-8">
                <motion.div
                  initial={{ x: -100, opacity: 0, rotate: -45 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <PartyPopper className="w-14 h-14 text-gold" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Heart className="w-20 h-20 text-primary fill-primary drop-shadow-lg" />
                </motion.div>
                <motion.div
                  initial={{ x: 100, opacity: 0, rotate: 45 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <PartyPopper className="w-14 h-14 text-gold scale-x-[-1]" />
                </motion.div>
              </motion.div>

              <motion.h2
                className="text-5xl md:text-7xl font-serif font-bold text-gradient-romantic mb-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                You Made Me
                <br />
                <span className="italic">The Happiest!</span>
              </motion.h2>

              <motion.p
                className="text-2xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I can't wait to spend this beautiful life with you! 💕
              </motion.p>

              {/* Sparkles */}
              <motion.div className="flex justify-center gap-4 mb-10">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.8 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-gold" />
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Question;
