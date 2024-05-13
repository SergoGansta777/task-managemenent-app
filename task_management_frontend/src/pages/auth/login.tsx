import { Link } from "react-router-dom";
import { LoginForm } from "./components/login-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="flex w-full h-screen">
      <div
        className="bg-accent hidden lg:w-1/2 lg:flex
        items-center justify-center 
        relative"
      >
        <div className="w-60 h-60 bg-gradient-to-tr from-accent to-accent-foreground rounded-full animate-spin-slow"></div>
        <div className="w-full h-1/2 bg-accent-foreground/4 backdrop-blur-lg absolute bottom-0"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Card className="mx-auto max-w-lg p-4 rounded-xl">
          <CardHeader className="mb-0.5 flex flex-col space-y-2 text-left">
            <CardTitle className="text-3xl tracking-wide">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Don't have an account?
            <Link
              to="/signup"
              className="px-1 underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
