import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function SubmitFormButton({
  text,
  align = "self-end",
}: {
  text: string;
  align?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("w-full", align)}
      size="lg"
      disabled={pending}
      variant="outline"
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitFormButton;
