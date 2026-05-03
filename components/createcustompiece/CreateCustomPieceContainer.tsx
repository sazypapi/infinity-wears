"use client";
import TextType from "@/components/TextType";
import CreateCustomPieceForm from "./CreateCustomPieceForm";

function CreateCustomPieceContainer() {
  return (
    <div>
      <TextType
        text={["Let's create a custom piece", "Bring your idea to reality"]}
        typingSpeed={75}
        className="text-sm"
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
      />
      <CreateCustomPieceForm />
    </div>
  );
}

export default CreateCustomPieceContainer;
