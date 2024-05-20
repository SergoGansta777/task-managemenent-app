import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/authContext";
import { LoginInput, loginScheme } from "@/types";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const loginMutation = async (data: LoginInput) => {
    return await login(data);
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: loginMutation,
    onSuccess: () => {
      navigate("/");
    },
  });

  function onSubmit(data: LoginInput) {
    mutateAsync(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit" disabled={isPending}>
              Login
            </Button>
            {isError && <FormMessage>{error.message}</FormMessage>}
          </div>
        </form>
      </Form>
    </div>
  );
}
