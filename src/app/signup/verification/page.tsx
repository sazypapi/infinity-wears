import BlurText from "@/components/BlurText";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function Verification() {
  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center repeat-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/verification.jpg')" }}
    >
      <Card
        className="w-[90%] sm:w-[70%] lg:w-[40%] h-[fit] bg-black/50 backdrop-blur-sm backdrop-saturate-150
              border-t border-white/20
              shadow-2xl rounded  smp-10"
      >
        <CardContent className="flex justify-center flex-col items-center">
          <h2>
            Welcome! Please check your email for a verification link to complete
            your sign-up.
          </h2>
          <br />
          <h3>
            {" "}
            If you've signed up before but haven't verified, we've re-sent the
            link. <br /> If your account is already verified, you can simply{" "}
            <Link href="/signin" className="underline">
              signin
            </Link>{" "}
            .
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default Verification;
