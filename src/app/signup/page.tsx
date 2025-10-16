"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import SubmitButton from "../../../components/global/Button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  // NORMAL SIGNUP
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/signin",
        },
      });

      console.log("signUp response:", { data, error });

      if (error) {
        setError(error.message || "An error occurred during sign up.");
        return;
      }

      if (!data?.session) {
        router.push("/signup/verification");
        return;
      }

      router.push("/user-data");
    } catch (err: unknown) {
      console.error("Unexpected signUp error", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error — try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.log("Google sign-in error: " + error.message);
    setGoogleLoading(false);
  };

  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center repeat-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/authbg.jpg')" }}
    >
      <Card className="w-[90%] sm:w-[70%] lg:w-[30%] h-fit bg-black/50 backdrop-blur-sm backdrop-saturate-150 border-t border-white/20 shadow-2xl rounded smp-10">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSignUp}>
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col mt-5 gap-2">
            <SubmitButton text="Create Account" loading={loading} />
            <SubmitButton
              text="Sign Up with Google"
              onClick={handleGoogleSignUp}
              loading={googleLoading}
              type="button"
              align="self-stretch"
            />
            <h3 className="mt-5 text-xs">
              Already have an account?{" "}
              <Link href="/signin" className="underline">
                Sign in
              </Link>
            </h3>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
