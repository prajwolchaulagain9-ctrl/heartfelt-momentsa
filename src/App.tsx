import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Begin from "./pages/Begin";
import Reasons from "./pages/Reasons";
import Feelings from "./pages/Feelings";
import Question from "./pages/Question";
import NotFound from "./pages/NotFound";
import BackgroundMusic from "./components/BackgroundMusic";
import CursorTrail from "./components/CursorTrail";
import PinGuard from "./components/PinGuard";
import PinGate from "./pages/PinGate";
import { PinProvider } from "./context/PinContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PinProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BackgroundMusic />
        <CursorTrail />
        <BrowserRouter>
          <Routes>
            <Route path="/pin" element={<PinGate />} />
            <Route
              path="/"
              element={
                <PinGuard>
                  <Welcome />
                </PinGuard>
              }
            />
            <Route
              path="/begin"
              element={
                <PinGuard>
                  <Begin />
                </PinGuard>
              }
            />
            <Route
              path="/reasons"
              element={
                <PinGuard>
                  <Reasons />
                </PinGuard>
              }
            />
            <Route
              path="/feelings"
              element={
                <PinGuard>
                  <Feelings />
                </PinGuard>
              }
            />
            <Route
              path="/question"
              element={
                <PinGuard>
                  <Question />
                </PinGuard>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <PinGuard>
                  <NotFound />
                </PinGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PinProvider>
  </QueryClientProvider>
);

export default App;
