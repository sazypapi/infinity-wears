"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateNames } from "../../utils/actions";
import FormContainer from "../global/FormContainer";
import SubmitFormButton from "../global/SubmitFormButton";

function UserDataForm() {
  const router = useRouter();

  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center repeat-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/signin.jpg')" }}
    >
      <Card
        className="w-[90%] sm:w-[70%] lg:w-[30%] h-fit bg-black/50 backdrop-blur-sm backdrop-saturate-150
            border-t border-white/20
            shadow-2xl rounded smp-10"
      >
        <CardHeader>
          <CardTitle>
            What’s your name? It helps us tailor your experience to you.
          </CardTitle>
        </CardHeader>

        <FormContainer
          action={updateNames}
          onSuccess={() => router.push("/dashboard")}
        >
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" name="first_name" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" type="text" name="last_name" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col mt-5 gap-2">
            <SubmitFormButton text="Submit" />
          </CardFooter>
        </FormContainer>
      </Card>
    </div>
  );
}

export default UserDataForm;
