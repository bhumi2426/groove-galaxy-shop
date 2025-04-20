
import { Music2, ShoppingCart, User, FileMusic, Mic2, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/95 backdrop-blur-sm border-b border-purple-800/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music2 className="w-8 h-8 text-[#9b87f5]" />
          <Link to="/" className="text-xl font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text">
            Groove Galaxy
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/composer">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <FileMusic className="w-4 h-4 mr-2" />
              Composers
            </Button>
          </Link>
          <Link to="/singer">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <Mic2 className="w-4 h-4 mr-2" />
              Singers
            </Button>
          </Link>
          <Link to="/song">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <Music2 className="w-4 h-4 mr-2" />
              Songs
            </Button>
          </Link>
          <Link to="/customer">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <User className="w-4 h-4 mr-2" />
              Customers
            </Button>
          </Link>
          <Link to="/purchase">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
