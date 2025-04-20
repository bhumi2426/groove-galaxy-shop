
import { Music2, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/95 backdrop-blur-sm border-b border-purple-800/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music2 className="w-8 h-8 text-[#9b87f5]" />
          <span className="text-xl font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text">
            Groove Galaxy
          </span>
        </div>
        
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Discover
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Library
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Playlists
          </Button>
          <Button variant="outline" className="border-purple-500/50 hover:border-purple-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-2">Cart (0)</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
