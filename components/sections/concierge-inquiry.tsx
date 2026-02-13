'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { IMaskInput } from 'react-imask';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(14, { message: "Please enter a complete phone number." }),
  date: z.date({ message: "A consultation date is required." }),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const projectTypes = [
  "Brand Identity",
  "Digital Product",
  "Spatial Design",
  "Strategy",
  "Other"
];

export default function ConciergeInquiry() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsReviewOpen(true);
  };

  const onError = (errors: any) => {
    // console.log(Object.keys(errors))
    const first = Object.keys(errors || {})[0]
    if (first) {
      try {
        form.setFocus(first as any)
      } catch (e) {
        // ignore if focus cannot be set
      }
    }
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsReviewOpen(false);
    toast.success("Inquiry Sent Successfully", {
      description: "Our concierge will contact you within 24 hours.",
      duration: 20000,
      position: "top-center",
      style: {
        background: "var(--foreground)",
        border: "1px solid var(--border)",
        color: "var(--background)",
        borderRadius: "1rem",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      },
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
      // icon: <CheckCircle2 className="w-5 h-5 text-background" />,
    });
    form.reset();
  };

  useGSAP(() => {
    gsap.set(formContainerRef.current, { opacity: 0, y: 40 });
    gsap.set(formContainerRef.current, { visibility: "visible" });

    gsap.to(formContainerRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-background border-t border-foreground/5" id="inquiry">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={formContainerRef} className="form-container invisible">
          <div className="mb-16 text-center">
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Concierge Service
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
              Start Your Journey
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Experience a tailored consultation where we define the future of your brand. Fill in your details below to initiate our exclusive process.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="JEAN DOE" 
                          {...field} 
                          className="
                            bg-zinc-950 
                            border-zinc-800 
                            focus:ring-1 
                            focus:outline-1 
                            focus:outline-foreground
                            focus:ring-foreground!
                            focus-visible:border-ring!
                            focus-visible:ring-ring/50!
                            focus-visible:ring-[3px]!
                            focus-visible:outline-none
                            focus-visible:bg-zinc-900! 
                            hover:bg-zinc-900! 
                            hover:border-zinc-500!
                            transition-all 
                            rounded-none 
                            py-6 
                            uppercase
                          " 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="HELLO@COMPANY.COM" 
                          {...field} 
                          className="
                            bg-zinc-950 
                            border-zinc-800 
                            focus:ring-1 
                            focus:outline-1 
                            focus:outline-foreground
                            focus:ring-foreground!
                            focus-visible:border-ring!
                            focus-visible:ring-ring/50!
                            focus-visible:ring-[3px]!
                            focus-visible:outline-none
                            focus-visible:bg-zinc-900! 
                            hover:bg-zinc-900! 
                            hover:border-zinc-500!
                            transition-all 
                            rounded-none 
                            py-6 
                            uppercase
                          " 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone with Mask */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Phone Number</FormLabel>
                      <FormControl>
                        <IMaskInput
                          mask="(00) 00000-0000"
                          definitions={{
                            '#': /[1-9]/,
                          }}
                          placeholder="(00) 00000-0000"
                          {...field}
                          value={field.value}
                          onAccept={(value) => field.onChange(value)}
                          className="
                            flex h-12 
                            w-full 
                            border 
                            border-zinc-800 
                            bg-zinc-950 
                            px-3 py-6 
                            .text-sm 
                            placeholder:text-zinc-400 
                            outline-0
                            focus:outline-1 
                            focus:outline-foreground
                            focus:ring-foreground!
                            focus-visible:border-ring!
                            focus-visible:ring-ring/50!
                            focus-visible:ring-[3px]!
                            focus-visible:outline-none
                            focus-visible:bg-zinc-900! 
                            hover:bg-zinc-900! 
                            hover:border-zinc-500!
                            aria-invalid:ring-destructive/20 
                            aria-invalid:border-destructive
                            dark:aria-invalid:ring-destructive/40 
                            file:border-0 
                            file:bg-transparent 
                            file:text-sm 
                            file:font-medium 
                            disabled:cursor-not-allowed 
                            disabled:opacity-50 
                            disabled:pointer-events-none
                            transition-all 
                            rounded-none 
                            uppercase
                          "
                        />
                        {/* Note: IMaskInput doesn't directly integrate with react-hook-form, so we handle the value and onChange manually. */}
                        {/* We add a custom validation message for the phone field in the schema to ensure it meets the required format. */}
                        {/* The zod schema will check for a minimum length to ensure the phone number is complete, and the mask will guide the user to enter it in the correct format. */}
                        {/* The placeholder and mask will help users input their phone number correctly, while the validation will ensure that incomplete numbers are not accepted. */}
                        {/* This approach allows us to maintain a consistent user experience while ensuring data integrity for the phone number field. */}
                        {/* We also add a custom css to keep <IMaskInput> similar behavior to the Shadcn UI <Input> element. Some customization were extended to other fields in the form, providing a consistent experience*/}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Type Tags */}
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500 mb-4 block">Project Type</FormLabel>
                      <div className="flex flex-wrap gap-3">
                        {projectTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => field.onChange(type)}
                            className={cn(
                              "px-6 py-2 border text-xs uppercase tracking-widest transition-all duration-300",
                              field.value === type
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-zinc-400 border-zinc-800 focus-visible:bg-zinc-900! hover:bg-zinc-900! hover:border-zinc-500!"
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Picker */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col md:col-span-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Preferred Consultation Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full md:w-70 py-6 bg-zinc-950 border-zinc-800 rounded-none text-left font-normal uppercase tracking-widest text-xs",
                                `
                                  hover:border-zinc-500!
                                  hover:bg-zinc-900!
                                  active:border-zinc-800!
                                `,
                                !field.value && "text-zinc-400"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-950 border-zinc-800" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="text-foreground"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Inquiry Brief</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="DESCRIBE YOUR VISION..."
                          className="
                            bg-zinc-950 
                            border-zinc-800 
                            focus:ring-1 
                            focus:outline-1 
                            focus:outline-foreground
                            focus:ring-foreground!
                            focus-visible:border-ring!
                            focus-visible:ring-ring/50!
                            focus-visible:ring-[3px]!
                            focus-visible:outline-none
                            focus-visible:bg-zinc-900!
                            hover:bg-zinc-900!
                            hover:border-zinc-500!
                            transition-all 
                            rounded-none 
                            min-h-37.5 
                            uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center mt-12">
                <button type="submit" className="px-8 py-4 border border-foreground/20 bg-foreground text-background hover:bg-zinc-300 transition-colors duration-300 uppercase tracking-widest text-sm font-medium cursor-pointer">
                  Review Inquiry
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-foreground max-w-xl rounded-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-sans font-normal tracking-tighter mb-2">Review Your Inquiry</DialogTitle>
            <DialogDescription className="text-zinc-500 text-base">
              Please verify your information before we finalize the request.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-8 py-6 border-y border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Name</span>
                <span className="text-sm">{form.getValues("name")}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Email</span>
                <span className="text-sm">{form.getValues("email")}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Phone</span>
                <span className="text-sm">{form.getValues("phone")}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Project</span>
                <span className="text-sm">{form.getValues("projectType")}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Date</span>
                <span className="text-sm">{form.getValues("date") ? format(form.getValues("date"), "PPP") : "-"}</span>
              </div>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Brief</span>
              <p className="text-sm text-zinc-400 italic">"{form.getValues("message")}"</p>
            </div>
          </div>

          <DialogFooter className="gap-4">
            <Button variant="outline" onClick={() => setIsReviewOpen(false)} className="rounded-none border-zinc-800 hover:bg-zinc-900 uppercase text-xs tracking-widest">
              Back
            </Button>
            <Button onClick={handleConfirmOrder} disabled={isSubmitting} className="rounded-none bg-foreground text-background hover:bg-zinc-200 uppercase text-xs tracking-widest min-w-35">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalize Inquiry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
