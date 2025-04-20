
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  customer_id: z.string().min(1, "Customer is required"),
  song_id: z.string().min(1, "Song is required"),
  purchase_date: z.string().min(1, "Purchase date is required"),
});

export default function PurchaseForm() {
  const navigate = useNavigate();

  // Fetch customers and songs for the dropdowns
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Customer')
        .select('customer_id, customer_name');
      if (error) throw error;
      return data;
    },
  });

  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Song')
        .select('Song_ID, Song_Title');
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
      song_id: "",
      purchase_date: new Date().toISOString().split('T')[0],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase
        .from('Purchase')
        .insert([{
          customer_id: parseInt(values.customer_id),
          song_id: parseInt(values.song_id),
          purchase_date: values.purchase_date,
        }]);

      if (error) throw error;

      toast.success("Purchase completed successfully!");
      form.reset();
      navigate('/');
    } catch (error) {
      console.error('Error creating purchase:', error);
      toast.error("Failed to complete purchase. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121212] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">New Purchase</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#2A2F3C] border-purple-800/20">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.customer_id} value={customer.customer_id.toString()}>
                          {customer.customer_name}
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
              name="song_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#2A2F3C] border-purple-800/20">
                        <SelectValue placeholder="Select song" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {songs.map((song) => (
                        <SelectItem key={song.Song_ID} value={song.Song_ID.toString()}>
                          {song.Song_Title}
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
              name="purchase_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <input
                      type="date"
                      {...field}
                      className="flex h-10 w-full rounded-md border border-purple-800/20 bg-[#2A2F3C] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Complete Purchase
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
