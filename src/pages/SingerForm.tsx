
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  singer_name: z.string().min(2, "Name must be at least 2 characters"),
  contact_no: z.string().min(10, "Contact number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export default function SingerForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      singer_name: "",
      contact_no: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase
        .from('Singer')
        .insert([{
          Singer_Name: values.singer_name,
          Contact_No: values.contact_no,
          Address: values.address,
        }]);

      if (error) throw error;

      toast.success("Singer details submitted successfully!");
      form.reset();
      navigate('/');
    } catch (error) {
      console.error('Error inserting singer:', error);
      toast.error("Failed to submit singer details. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121212] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Singer</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="singer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Singer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter singer name" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter address" {...field} className="bg-[#2A2F3C] border-purple-800/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
