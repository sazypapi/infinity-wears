"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      // Get the current session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ✅ User is logged in
        router.push("/dashboard");
      } else {
        // ❌ No session — send them home or to sign-in
        router.push("/signin");
      }
    };

    handleSession();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <p>Signing you in, please wait...</p>
    </div>
  );
}
