
import { useState } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C]/95 backdrop-blur-sm border-t border-purple-800/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg"
              alt="Current song"
              className="w-12 h-12 rounded-md"
            />
            <div>
              <h4 className="text-white font-medium">Current Song</h4>
              <p className="text-gray-400 text-sm">Artist Name</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center flex-1 max-w-xl px-8">
            <div className="flex items-center space-x-4 mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full w-10 h-10 bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="w-full flex items-center space-x-3">
              <span className="text-xs text-gray-400">0:00</span>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-gray-400">3:45</span>
            </div>
          </div>
          
          <div className="w-24">
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
