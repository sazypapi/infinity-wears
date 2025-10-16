"use client";

import { toast } from "sonner";
import { supabase } from "./supabaseClient";
import { redirect, useRouter } from "next/navigation";

export const signUp = async (
  email: string,
  password: string,
  router: ReturnType<typeof import("next/navigation").useRouter>
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/signin",
    },
  });
  if (error) {
    return { error: error.message };
  }
  if (!data.session) {
    // toast("Confirmation Link sent to " + email);
    router.push("/signup/verification");
  } else {
    redirect("/user-data");
  }
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: error.message };
  }
  if (!data.session) {
    toast("Please check your email to confirm your account");
  } else {
    toast("Welcom back");

    redirect("/user-data");
  }
};
