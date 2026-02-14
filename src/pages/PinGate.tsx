import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePin } from "@/context/PinContext";
import type { PinProfile } from "@/content/pinContent";

const pinMap: Record<string, PinProfile> = {
  "7898": "default",
  "2345": "alt",
};

const PinGate = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = usePin();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      navigate("/", { replace: true });
    }
  }, [profile, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = pin.trim();
    const nextProfile = pinMap[normalized];
    if (!nextProfile) {
      setError("Incorrect PIN. Please try again.");
      setPin("");
      return;
    }
    setError("");
    setProfile(nextProfile);
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-gradient-dreamy flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-romantic p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gradient-romantic">
          Enter the secret PIN
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A tiny lock to keep this space just for us.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="4-digit PIN"
            className="text-center text-lg tracking-[0.3em]"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="romantic" size="lg" className="w-full">
            Unlock
          </Button>
        </form>
      </motion.div>
    </main>
  );
};

export default PinGate;
