import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feelings = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">

      <div className="text-center z-10 w-full bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
        {/* Main quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-slate-700 leading-relaxed mb-6"
        >
          In a world full of temporary things,{" "}
          <motion.span 
            className="text-rose-600 font-semibold not-italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            you are my forever
          </motion.span>
          .
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-600 mb-6">
          My heart knew you before my eyes ever saw you.
        </motion.p>

        {/* Heart icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center my-8"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-slate-600 mb-6"
        >
          And now, there's something I've been meaning to ask you...
        </motion.p>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <Button size="lg" variant="romantic" onClick={() => navigate("/question")}>
            I'm Ready
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default Feelings;
;
