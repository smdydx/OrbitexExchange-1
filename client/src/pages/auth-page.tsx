import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Custom Input component with icon
function IconInput({ 
  icon, 
  ...props 
}: { 
  icon?: ReactNode 
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <Input
        className={cn(
          "bg-[#0F172A] border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B]",
          icon && "pl-10",
          props.className
        )}
        {...props}
      />
    </div>
  );
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, User, Key, Wallet, Gift, UserCircle, Rocket } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email"),
  walletAddress: z.string().optional(),
  referredBy: z.string().optional(),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [_, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
      walletAddress: "",
      referredBy: "",
    },
  });

  const { toast } = useToast();
  
  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
      });
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = values;
      
      // When registering, show a nice toast indicating the process has started
      toast({
        title: "Creating your account...",
        description: "Please wait while we set up your account",
      });
      
      await registerMutation.mutateAsync(registerData);
      
      // Success toast
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Welcome to Orbitex! You are now logged in.",
        variant: "default",
      });
      
      // Switch to login tab after successful registration
      setActiveTab("login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-16">
      <div className="container max-w-md mx-auto px-4 py-4">
        {/* Mobile Logo */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
            <Rocket className="h-8 w-8 text-white" />
          </div>
        </div>
        
        {/* Auth Card */}
        <div className="bg-[#1a2235] rounded-xl p-5 shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to Orbitex
            </h1>
            <p className="text-[#94A3B8] text-sm">
              {activeTab === "login"
                ? "Enter your credentials to access your account"
                : "Create a new account to get started"}
            </p>
          </div>
          
          {/* Tabs */}
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-5 bg-[#101927]">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-white py-2"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-primary data-[state=active]:text-white py-2"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Username
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<User className="h-4 w-4" />}
                            placeholder="Enter your username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Password
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Key className="h-4 w-4" />}
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 mt-2"
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<UserCircle className="h-4 w-4" />}
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Username
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<User className="h-4 w-4" />}
                            placeholder="Choose a username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Mail className="h-4 w-4" />}
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Wallet Address (Optional)
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Wallet className="h-4 w-4" />}
                            placeholder="Your ETH or BSC wallet address"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="referredBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Referral Code (Optional)
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Gift className="h-4 w-4" />}
                            placeholder="Enter referral code if you have one"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Password
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Key className="h-4 w-4" />}
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <IconInput
                            icon={<Key className="h-4 w-4" />}
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 mt-2"
                  >
                    {registerMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Create Account
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-[#94A3B8]">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#1a2235] p-4 rounded-lg">
            <p className="text-primary text-2xl font-bold mb-1">10M</p>
            <p className="text-[#94A3B8] text-sm">Total Supply</p>
          </div>
          <div className="bg-[#1a2235] p-4 rounded-lg">
            <p className="text-primary text-2xl font-bold mb-1">10%</p>
            <p className="text-[#94A3B8] text-sm">Max Staking APY</p>
          </div>
        </div>
      </div>
    </div>
  );
}