"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  placeholder?: string;
};

function TextArea({
  name,
  labelText,
  defaultValue,
  placeholder,
}: TextAreaInputProps) {
  const [textarea, setTextArea] = useState(defaultValue || "");
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize mb-2">
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
        className="leading-loose  border-2 border-gray-300"
      />
    </div>
  );
}

export default TextArea;
