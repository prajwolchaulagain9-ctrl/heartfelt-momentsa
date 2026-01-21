import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <FloatingHearts />
      <Hero
        title={
          <>
            A Heartfelt Moment Awaits
          </>
        }
        subtitle={
          <>A gentle, romantic journey crafted just for you.</>
        }
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="romantic" size="xl" onClick={() => navigate("/begin")}>
            Begin the Moment 💕
          </Button>
        </motion.div>
      </Hero>
    </>
  );
};

export default Welcome;
