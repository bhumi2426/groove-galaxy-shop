
import { Navigation } from "@/components/Navigation";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SongCard } from "@/components/SongCard";
import { PlaylistSection } from "@/components/PlaylistSection";

const featuredSongs = [
  {
    title: "Summer Breeze",
    artist: "Luna Ray",
    genre: "Pop",
    duration: "3:45",
    price: 1.99,
    coverUrl: "/placeholder.svg"
  },
  {
    title: "Midnight Drive",
    artist: "The Wanderers",
    genre: "Rock",
    duration: "4:20",
    price: 2.49,
    coverUrl: "/placeholder.svg"
  },
  {
    title: "Ocean Waves",
    artist: "Chill Masters",
    genre: "Ambient",
    duration: "5:15",
    price: 1.99,
    coverUrl: "/placeholder.svg"
  },
  {
    title: "City Lights",
    artist: "Urban Sound",
    genre: "Electronic",
    duration: "3:55",
    price: 2.99,
    coverUrl: "/placeholder.svg"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121212]">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Featured Songs</h2>
            <button className="text-purple-400 hover:text-purple-300">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSongs.map((song) => (
              <SongCard key={song.title} {...song} />
            ))}
          </div>
        </section>
        
        <PlaylistSection />
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
