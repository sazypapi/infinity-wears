"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
};

function TextArea({
  name,
  labelText,
  defaultValue,
  placeholder,
  className,
}: TextAreaInputProps) {
  const [textarea, setTextArea] = useState(defaultValue || "");
  return (
    <div className={cn("mb-2", className)}>
      <Label
        htmlFor={name}
        className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
      >
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        onChange={(e) => setTextArea(e.target.value)}
        name={name}
        value={textarea}
        rows={5}
        placeholder={placeholder}
        required
        className="leading-loose  border-2 border-gray-300 placeholder:text-xs sm:placeholder:text-sm"
      />
    </div>
  );
}

export default TextArea;
