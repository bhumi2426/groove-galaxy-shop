
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function PlaylistSection() {
  const playlists = [
    { name: "Your Favorites", songCount: 45 },
    { name: "Recently Played", songCount: 28 },
    { name: "Summer Hits", songCount: 32 },
    { name: "Workout Mix", songCount: 24 },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Playlists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.name} className="bg-[#1A1F2C] border-purple-900/20 p-4">
            <div className="aspect-square rounded-md bg-gradient-to-br from-[#9b87f5]/20 to-[#D6BCFA]/20 flex items-center justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-[#9b87f5]/30 flex items-center justify-center">
                <span className="text-2xl text-white">🎵</span>
              </div>
            </div>
            <h3 className="font-medium text-white">{playlist.name}</h3>
            <p className="text-sm text-gray-400">{playlist.songCount} songs</p>
            <Button variant="ghost" className="w-full mt-2 text-purple-400 hover:text-purple-300">
              Play All
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
