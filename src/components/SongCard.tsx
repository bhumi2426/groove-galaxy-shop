
import { Play, Pause, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SongCardProps {
  title: string;
  artist: string;
  genre: string;
  duration: string;
  price: number;
  coverUrl: string;
}

export function SongCard({ title, artist, genre, duration, price, coverUrl }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-[#1A1F2C] border-purple-900/20">
      <div className="aspect-square overflow-hidden">
        <img
          src={coverUrl}
          alt={`${title} by ${artist}`}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 right-4 rounded-full w-12 h-12 bg-[#9b87f5] hover:bg-[#7E69AB] transition-all duration-300 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-2">{artist}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400">{genre}</span>
            <span className="text-xs text-gray-500 ml-2">{duration}</span>
          </div>
          <Button 
            size="sm"
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            ${price}
          </Button>
        </div>
      </div>
    </Card>
  );
}
