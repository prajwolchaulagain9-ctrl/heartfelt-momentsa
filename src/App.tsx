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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BackgroundMusic />
      <CursorTrail />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/begin" element={<Begin />} />
          <Route path="/reasons" element={<Reasons />} />
          <Route path="/feelings" element={<Feelings />} />
          <Route path="/question" element={<Question />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
