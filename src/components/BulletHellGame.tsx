import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BulletHellGameProps {
  onComplete: () => void;
}

interface Player {
  x: number;
  y: number;
}

interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "heart" | "arrow" | "letter";
}

const BulletHellGame = ({ onComplete }: BulletHellGameProps) => {
  const isMobile = useIsMobile();
  const [gameState, setGameState] = useState<"intro" | "playing" | "endgame" | "caught" | "failed">("intro");
  const [player, setPlayer] = useState<Player>({ x: 50, y: 50 });
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const projectileIdCounter = useRef(0);
  const mousePosition = useRef({ x: 50, y: 50 });
  const playerRef = useRef<Player>({ x: 50, y: 50 });
  const spawnIntervalRef = useRef<number>();
  const gameStateRef = useRef<"intro" | "playing" | "endgame" | "caught" | "failed">("intro");
  const lastHitRef = useRef(0);
  const intenseAudioRef = useRef<HTMLAudioElement>(null);
  const softAudioRef = useRef<HTMLAudioElement>(null);
  const lastFrameTimeRef = useRef(0);

  const GAME_WIDTH = 100; // percentage
  const GAME_HEIGHT = 100; // percentage
  const PLAYER_SIZE = isMobile ? 3.2 : 2.6; // percentage
  const PROJECTILE_SIZE = isMobile ? 2.4 : 2.7; // percentage
  const SURVIVAL_TIME = 15; // seconds
  const ENDGAME_DURATION_MS = 5000;
  const MAX_LIVES = 3;
  const HIT_COOLDOWN_MS = isMobile ? 750 : 600;
  const MAX_PROJECTILES = isMobile ? 18 : 36;
  const BASE_SPAWN_INTERVAL_MS = isMobile ? 700 : 520;
  const MIN_SPAWN_INTERVAL_MS = isMobile ? 260 : 180;

  // Sync refs with state
  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(SURVIVAL_TIME);
    setScore(0);
    setLives(MAX_LIVES);
    setProjectiles([]);
    setPlayer({ x: 50, y: 50 });
    mousePosition.current = { x: 50, y: 50 };
    lastHitRef.current = 0;
    if (softAudioRef.current) {
      softAudioRef.current.pause();
      softAudioRef.current.currentTime = 0;
    }
    if (intenseAudioRef.current) {
      intenseAudioRef.current.currentTime = 0;
      intenseAudioRef.current.play().catch(() => undefined);
    }
  };

  // Control background music based on game state
  useEffect(() => {
    const intense = intenseAudioRef.current;
    const soft = softAudioRef.current;
    if (!intense || !soft) return;

    if (gameState === "playing") {
      soft.pause();
      soft.currentTime = 0;
      intense.play().catch(() => undefined);
    } else if (gameState === "endgame") {
      // Keep intense music during capture
      intense.play().catch(() => undefined);
    } else if (gameState === "caught") {
      intense.pause();
      intense.currentTime = 0;
      soft.play().catch(() => undefined);
    } else {
      intense.pause();
    }
  }, [gameState]);

  // Mouse/Touch tracking
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!gameAreaRef.current) return;
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      mousePosition.current = {
        x: Math.max(PLAYER_SIZE, Math.min(GAME_WIDTH - PLAYER_SIZE, x)),
        y: Math.max(PLAYER_SIZE, Math.min(GAME_HEIGHT - PLAYER_SIZE, y)),
      };
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gameState]);

  // Spawn projectiles
  useEffect(() => {
    if (gameState !== "playing") return;

    const spawnProjectile = () => {
      const type: "heart" | "arrow" | "letter" =
        (["heart", "arrow", "letter"][Math.floor(Math.random() * 3)] as "heart" | "arrow" | "letter");
      
      // Spawn from random edge
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, vx = 0, vy = 0;

      switch (edge) {
        case 0: // Top
          x = Math.random() * 100;
          y = -5;
          vx = (Math.random() - 0.5) * 0.7;
          vy = Math.random() * 0.6 + 0.45;
          break;
        case 1: // Right
          x = 105;
          y = Math.random() * 100;
          vx = -(Math.random() * 0.6 + 0.45);
          vy = (Math.random() - 0.5) * 0.7;
          break;
        case 2: // Bottom
          x = Math.random() * 100;
          y = 105;
          vx = (Math.random() - 0.5) * 0.7;
          vy = -(Math.random() * 0.6 + 0.45);
          break;
        case 3: // Left
          x = -5;
          y = Math.random() * 100;
          vx = Math.random() * 0.6 + 0.45;
          vy = (Math.random() - 0.5) * 0.7;
          break;
      }

      const newProjectile: Projectile = {
        id: projectileIdCounter.current++,
        x,
        y,
        vx,
        vy,
        type,
      };

      setProjectiles(prev => {
        const next = [...prev, newProjectile];
        if (next.length > MAX_PROJECTILES) {
          return next.slice(next.length - MAX_PROJECTILES);
        }
        return next;
      });
    };

    // Increase spawn rate over time
    const getSpawnInterval = () => {
      const elapsed = SURVIVAL_TIME - timeLeft;
      return Math.max(MIN_SPAWN_INTERVAL_MS, BASE_SPAWN_INTERVAL_MS - elapsed * 35);
    };

    const scheduleNextSpawn = () => {
      spawnIntervalRef.current = window.setTimeout(() => {
        spawnProjectile();
        scheduleNextSpawn();
      }, getSpawnInterval());
    };

    scheduleNextSpawn();

    return () => {
      if (spawnIntervalRef.current) {
        clearTimeout(spawnIntervalRef.current);
      }
    };
  }, [gameState, timeLeft, MAX_PROJECTILES, BASE_SPAWN_INTERVAL_MS, MIN_SPAWN_INTERVAL_MS]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    let animationFrameId: number;
    let hasTriggeredEnd = false;

    lastFrameTimeRef.current = performance.now();

    const gameLoop = () => {
      const now = performance.now();
      const frameDuration = isMobile ? 1000 / 30 : 1000 / 60;

      if (now - lastFrameTimeRef.current < frameDuration) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      const delta = Math.min((now - lastFrameTimeRef.current) / 16.67, 2);
      lastFrameTimeRef.current = now;
      const speedMultiplier = (isMobile ? 0.85 : 1) * delta;

      // Update player position smoothly
      setPlayer(prev => {
        const newPlayer = {
          x: prev.x + (mousePosition.current.x - prev.x) * 0.2 * speedMultiplier,
          y: prev.y + (mousePosition.current.y - prev.y) * 0.2 * speedMultiplier,
        };
        playerRef.current = newPlayer;
        return newPlayer;
      });

      // Update projectiles and check collisions in one pass
      setProjectiles(prev => {
        const currentPlayer = playerRef.current;
        let hitProjectile: Projectile | null = null;

        // Update positions and filter out-of-bounds
        const updatedProjectiles = prev
          .map(proj => ({
            ...proj,
            x: proj.x + proj.vx * speedMultiplier,
            y: proj.y + proj.vy * speedMultiplier,
          }))
          .filter(proj => 
            proj.x > -10 && proj.x < 110 && proj.y > -10 && proj.y < 110
          );

        // Check for collision with current player position
        const now = Date.now();
        const canTakeHit = now - lastHitRef.current > HIT_COOLDOWN_MS;

        for (const proj of updatedProjectiles) {
          const dx = proj.x - currentPlayer.x;
          const dy = proj.y - currentPlayer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < (PLAYER_SIZE + PROJECTILE_SIZE) / 1.7 && canTakeHit) {
            hitProjectile = proj;
            break;
          }
        }

        // Handle collision
        if (hitProjectile) {
          lastHitRef.current = Date.now();
          setScore(s => s + 1);
          setLives(prevLives => {
            const nextLives = prevLives - 1;
            if (nextLives <= 0 && !hasTriggeredEnd) {
              hasTriggeredEnd = true;
              setGameState("failed");
              setProjectiles([]);
            }
            return Math.max(0, nextLives);
          });

          return updatedProjectiles.filter(p => p.id !== hitProjectile!.id);
        }

        return updatedProjectiles;
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameState, isMobile, HIT_COOLDOWN_MS]);

  // Timer: main survival countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setProjectiles([]);
          setGameState("endgame");
          setPlayer({ x: 50, y: 50 });
          mousePosition.current = { x: 50, y: 50 };

          setTimeout(() => {
            if (gameStateRef.current === "endgame") {
              setGameState("caught");
            }
          }, ENDGAME_DURATION_MS);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);


  const getProjectileEmoji = (type: string) => {
    switch (type) {
      case "heart": return "💕";
      case "arrow": return "💘";
      case "letter": return "💌";
      default: return "💕";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Game music */}
      <audio ref={intenseAudioRef} loop preload="auto">
        <source src="https://assets.mixkit.co/active_storage/sfx/1212/1212-preview.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={softAudioRef} loop preload="auto">
        <source src="https://assets.mixkit.co/active_storage/sfx/2313/2313-preview.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-16 h-16 mx-auto text-primary fill-primary mb-4" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
              One Final Task
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Before I ask you my question, there's one more challenge...
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/60 max-w-xl mx-auto space-y-4">
              <p className="text-base text-slate-700">
                Survive for <span className="font-bold text-primary">15 seconds</span> while love letters, hearts, and cupid's arrows fly at you from all directions.
              </p>
              <p className="text-base text-slate-700">
                You have <span className="font-bold text-primary">{MAX_LIVES} lives</span>. Touch obstacles {MAX_LIVES} times and you'll have to restart.
              </p>
              <p className="text-sm text-slate-600 italic">
                Move your mouse (or finger) to control your character. At the end, you’ll be held in the center.
              </p>
            </div>

            <motion.button
              onClick={startGame}
              className="px-10 py-4 bg-gradient-romantic text-primary-foreground rounded-full text-lg font-semibold shadow-romantic hover:shadow-glow"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              I'm Ready!
            </motion.button>
          </motion.div>
        )}

        {(gameState === "playing" || gameState === "endgame") && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Game stats */}
            <div className="flex flex-wrap justify-between items-center text-sm gap-3">
              <span className="text-muted-foreground">
                {gameState === "endgame" ? "Captured..." : `Time: ${timeLeft}s`}
              </span>
              <span className="text-muted-foreground">
                {gameState === "endgame" ? "A net is closing in" : "Dodge Everything!"}
              </span>
              <span className="text-muted-foreground">Dodges: {score}</span>
              <span className="text-muted-foreground flex items-center gap-1">
                Lives:
                {[...Array(MAX_LIVES)].map((_, idx) => (
                  <span key={idx} className={idx < lives ? "text-pink-500" : "text-slate-300"}>❤</span>
                ))}
              </span>
            </div>

            {/* Game area */}
            <div
              ref={gameAreaRef}
              className="relative w-full aspect-square max-w-2xl mx-auto rounded-3xl border-4 border-primary/30 bg-gradient-to-br from-pink-50/50 via-white/50 to-purple-50/50 backdrop-blur-sm overflow-hidden shadow-romantic cursor-none touch-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(236, 72, 153, 0.03) 0px, transparent 2px, transparent 20px, rgba(236, 72, 153, 0.03) 22px),
                  repeating-linear-gradient(90deg, rgba(236, 72, 153, 0.03) 0px, transparent 2px, transparent 20px, rgba(236, 72, 153, 0.03) 22px)
                `,
              }}
            >
              {/* Player */}
              <motion.div
                className="absolute"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  width: `${PLAYER_SIZE}%`,
                  height: `${PLAYER_SIZE}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={gameState === "endgame" ? {
                  filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <div className="relative w-full h-full">
                  {/* Player character - pixel art style */}
                  <div className="w-full h-full bg-gradient-to-br from-pink-600 to-rose-500 rounded-full shadow-lg relative">
                    {/* Eyes */}
                    <div className="absolute top-[30%] left-[25%] w-[15%] h-[15%] bg-white rounded-full" />
                    <div className="absolute top-[30%] right-[25%] w-[15%] h-[15%] bg-white rounded-full" />
                    {/* Hitbox indicator - tiny dot in center */}
                    <div className="absolute top-1/2 left-1/2 w-[8%] h-[8%] bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </motion.div>

              {/* Projectiles */}
              {projectiles.map(proj => (
                <motion.div
                  key={proj.id}
                  className="absolute text-2xl"
                  style={{
                    left: `${proj.x}%`,
                    top: `${proj.y}%`,
                    width: `${PROJECTILE_SIZE}%`,
                    height: `${PROJECTILE_SIZE}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: 1,
                    rotate: gameState === "endgame" ? 720 : isMobile ? 180 : 360,
                  }}
                  transition={{ 
                    scale: { duration: 0.2 },
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <span className="drop-shadow-lg">{getProjectileEmoji(proj.type)}</span>
                </motion.div>
              ))}

              {/* Endgame net capture */}
              {gameState === "endgame" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Net body */}
                  <motion.div
                    className="absolute w-[90%] h-[90%]"
                    initial={{ x: "-30%", y: "-60%", rotate: -18, scale: 0.6, opacity: 0 }}
                    animate={{ x: "0%", y: "0%", rotate: 6, scale: 1.05, opacity: 1 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                  >
                    <div
                      className="absolute inset-0 rounded-[48%] border-4 border-amber-700/70 bg-amber-200/10 shadow-[0_0_40px_rgba(120,53,15,0.25)]"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(45deg, rgba(120,53,15,0.5) 0 2px, transparent 2px 16px),
                          repeating-linear-gradient(-45deg, rgba(120,53,15,0.5) 0 2px, transparent 2px 16px)
                        `,
                      }}
                    />
                    {/* Net knots */}
                    {[...Array(9)].map((_, i) => (
                      <span
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-amber-700/80 shadow-[0_0_10px_rgba(120,53,15,0.6)]"
                        style={{
                          left: `${15 + (i % 3) * 30}%`,
                          top: `${20 + Math.floor(i / 3) * 30}%`,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Net ring (rim) */}
                  <motion.div
                    className="absolute w-[65%] h-[65%] rounded-full border-2 border-amber-600/70"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                  />
                </motion.div>
              )}
            </div>

            {gameState === "endgame" && (
              <motion.p
                className="text-center text-lg text-muted-foreground italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                The net tightens... you’re finally caught.
              </motion.p>
            )}
          </motion.div>
        )}

        {gameState === "failed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="space-y-6 text-center"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-serif font-bold text-gradient-romantic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              You were hit three times!
            </motion.h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Try again and survive the final barrage. You can do this.
            </p>
            <motion.button
              onClick={startGame}
              className="px-10 py-4 bg-gradient-romantic text-primary-foreground rounded-full text-lg font-semibold shadow-romantic hover:shadow-glow"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              Restart Challenge
            </motion.button>
          </motion.div>
        )}

        {gameState === "caught" && (
          <motion.div
            key="caught"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="space-y-8 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-20 h-20 mx-auto text-primary fill-primary drop-shadow-glow" />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-serif font-bold text-gradient-romantic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Now that I've finally caught you...
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              You've been dodging all this love flying at you, but there's no escaping what I need to ask next.
            </motion.p>

            <motion.button
              onClick={onComplete}
              className="px-10 py-4 bg-gradient-romantic text-primary-foreground rounded-full text-lg font-semibold shadow-romantic hover:shadow-glow"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              What do you want to ask me?
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BulletHellGame;
