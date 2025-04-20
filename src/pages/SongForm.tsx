import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  song_title: z.string().min(2, "Title must be at least 2 characters"),
  movie_album_name: z.string().min(2, "Movie/Album name must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  singer_id: z.string().min(1, "Singer is required"),
  composer_id: z.string().min(1, "Composer is required"),
});

export default function SongForm() {
  const navigate = useNavigate();

  // Fetch singers and composers for the dropdowns
  const { data: singers = [] } = useQuery({
    queryKey: ['singers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Singer')
        .select('Singer_id, Singer_Name');
      if (error) throw error;
      return data;
    },
  });

  const { data: composers = [] } = useQuery({
    queryKey: ['composers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Composer')
        .select('composer_id, composer_name');
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      song_title: "",
      movie_album_name: "",
      price: "",
      duration: "",
      category: "",
      size: "",
      singer_id: "",
      composer_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format the duration to a valid time format (HH:MM:SS)
      // Convert minutes to proper time format
      let formattedDuration = values.duration;
      
      // Check if duration contains a decimal point (e.g., 5.30)
      if (values.duration.includes('.')) {
        const [minutes, seconds] = values.duration.split('.');
        // Pad seconds if needed and ensure it's valid
        const paddedSeconds = seconds.length === 1 ? seconds + '0' : seconds;
        formattedDuration = `00:${minutes.padStart(2, '0')}:${paddedSeconds.padStart(2, '0')}`;
      } 
      // Check if duration is just a number (e.g., "5")
      else if (!values.duration.includes(':')) {
        formattedDuration = `00:${values.duration.padStart(2, '0')}:00`;
      }
      // If it's already in HH:MM:SS or MM:SS format, keep it as is
      
      console.log("Formatted duration:", formattedDuration);

      const { error } = await supabase
        .from('Song')
        .insert([{
          Song_Title: values.song_title,
          "Movie/Album Name": values.movie_album_name,
          Price: parseFloat(values.price),
          Duration: formattedDuration,
          Category: values.category,
          Size_MB: parseFloat(values.size),
          Singer_ID: parseInt(values.singer_id),
          Composer_ID: parseInt(values.composer_id),
        }]);

      if (error) throw error;

      toast.success("Song details submitted successfully!");
      form.reset();
      navigate('/');
    } catch (error) {
      console.error('Error inserting song:', error);
      toast.error("Failed to submit song details. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121212] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Song</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="song_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter song title" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="movie_album_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie/Album Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter movie or album name" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Enter price" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter as MM:SS" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                    </FormControl>
                    <FormMessage className="text-xs">
                      Format as MM:SS (e.g., 03:45) or minutes (e.g., 3.5)
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#2A2F3C] border-purple-800/20">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size (MB)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Enter file size" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="singer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Singer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#2A2F3C] border-purple-800/20">
                          <SelectValue placeholder="Select singer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {singers.map((singer) => (
                          <SelectItem key={singer.Singer_id} value={singer.Singer_id.toString()}>
                            {singer.Singer_Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="composer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Composer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#2A2F3C] border-purple-800/20">
                          <SelectValue placeholder="Select composer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {composers.map((composer) => (
                          <SelectItem key={composer.composer_id} value={composer.composer_id.toString()}>
                            {composer.composer_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
