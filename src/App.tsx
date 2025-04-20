
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComposerForm from "./pages/ComposerForm";
import SingerForm from "./pages/SingerForm";
import SongForm from "./pages/SongForm";
import CustomerForm from "./pages/CustomerForm";
import PurchaseForm from "./pages/PurchaseForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/composer" element={<ComposerForm />} />
          <Route path="/singer" element={<SingerForm />} />
          <Route path="/song" element={<SongForm />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/purchase" element={<PurchaseForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
