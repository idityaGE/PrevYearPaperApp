"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../components/ui/button"
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage
} from "../components/ui/form"
import {
  InputOTP, InputOTPGroup, InputOTPSlot
} from "../components/ui/input-otp"


import axios from "axios"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
  pin: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
})

export function InputOTPForm() {
  //const email = useAuthStore((state) => state.email);
  const email = localStorage.getItem('email');
  const clearEmail = useAuthStore((state) => state.clearEmail);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const otp: string = data.pin;
      console.log(typeof otp,"=",otp);
      
        const res = await axios.post("http://localhost:3000/api/auth/verify-otp", {
          email,
          otp
        });

      if (res.data?.success) {
        toast.success("✅ OTP verified successfully");
        const item = localStorage.getItem("token")
        clearEmail(); // clean store
        
         navigate("/dashboard")
      } else {
        toast.error(res.data?.message || "OTP verification failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Server error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }:any) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>Enter the 6-digit OTP sent to your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="border bg-black text-white w-full">Verify OTP</Button>
      </form>
    </Form>
  )
}
