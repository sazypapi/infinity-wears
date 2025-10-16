"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;
  if (!data.session) {
    return { message: "Confirmation link sent to your email" };
  } else {
    redirect("/");
  }
};
