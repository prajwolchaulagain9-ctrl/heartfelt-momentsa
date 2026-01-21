import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4">
      <div className="text-center w-full">
        <div className="container max-w-md mx-auto py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-serif font-bold text-gradient-romantic mb-3">Lost in Love</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">That page doesn’t exist. Let’s guide you back home.</p>
            <Button asChild variant="romantic" size="lg">
              <a href="/">Return to Home</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
