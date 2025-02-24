
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { HotelProvider } from "./contexts/HotelContext";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import Parks from "./pages/Parks";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <HotelProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/parks" element={<Parks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HotelProvider>
  </AuthProvider>
);

export default App;
