// components/global/Button.tsx
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function SubmitButton({
  text,
  align = "self-end",
  loading = false,
  onClick,
  type = "submit",
}: {
  text: string;
  align?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn("w-full ", align)}
      size="lg"
      disabled={loading}
    >
      {loading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitButton;
