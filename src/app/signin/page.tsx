"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    if (!data.session) {
      router.push("/signup/verification");
    } else {
      router.push("/user-data");
    }
  };
  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center repeat-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/signin.jpg')" }}
    >
      <Card
        className="w-[90%] sm:w-[70%] lg:w-[30%] h-[fit] bg-black/50 backdrop-blur-sm backdrop-saturate-150
        border-t border-white/20
        shadow-2xl rounded  smp-10"
      >
        <CardHeader>
          <CardTitle>Log into your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <a
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col mt-5 gap-2">
            <Button type="submit" className="w-full">
              Log in
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
            <h3 className="mt-5 text-xs">
              Don't have an account,{" "}
              <Link href="/signup" className="underline">
                create account
              </Link>
            </h3>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignInPage;
