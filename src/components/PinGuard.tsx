import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePin } from "@/context/PinContext";

const PinGuard = ({ children }: { children: ReactNode }) => {
  const { profile } = usePin();

  if (!profile) {
    return <Navigate to="/pin" replace />;
  }

  return <>{children}</>;
};

export default PinGuard;
