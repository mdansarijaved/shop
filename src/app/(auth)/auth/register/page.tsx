"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { registerSchema } from "@/zod/schema";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof registerSchema>;

const RegisterUser = async (data: LoginFormValues) => {
  await register(data);
};

function RegisterPage() {
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      toast("registration successfull");
      toast("Redirecting to login page");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    },
    onError: (error: Error) => {
      setAuthError(error.message);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setAuthError(null);
    loginMutation.mutate(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-950  flex items-center justify-center p-4 relative">
      <Card className="max-w-md w-full relative z-50 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            SignUp
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email, name and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loginMutation.isPending}
                          type="email"
                          placeholder="johdoe@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loginMutation.isPending}
                          type="text"
                          placeholder="johdoe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loginMutation.isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          {authError && (
            <Alert variant="destructive">
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          {loginMutation.isSuccess && (
            <Alert variant="default" className="border-green-400">
              <AlertDescription>
                Registration successful you can login now
              </AlertDescription>
            </Alert>
          )}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => console.log("Google login")}
            >
              <Icons.google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("GitHub login")}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2 ">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              already have an account?
            </span>
            <Link
              href="/auth/login"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              login
            </Link>
          </div>
          <Link
            href="#"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
