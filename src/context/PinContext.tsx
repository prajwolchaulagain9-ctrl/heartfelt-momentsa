import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PinProfile } from "@/content/pinContent";

interface PinContextValue {
  profile: PinProfile | null;
  setProfile: (profile: PinProfile | null) => void;
}

const PinContext = createContext<PinContextValue | undefined>(undefined);

const storageKey = "heartfelt-pin-profile";

const readStoredProfile = (): PinProfile | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "default" || stored === "alt") {
    return stored;
  }
  return null;
};

export const PinProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<PinProfile | null>(readStoredProfile);

  const setProfile = useCallback((next: PinProfile | null) => {
    setProfileState(next);
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem(storageKey, next);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const value = useMemo(() => ({ profile, setProfile }), [profile, setProfile]);

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};

export const usePin = (): PinContextValue => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error("usePin must be used within a PinProvider");
  }
  return context;
};
