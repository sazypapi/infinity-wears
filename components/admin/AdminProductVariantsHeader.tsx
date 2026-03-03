import { CardHeader, CardTitle } from "@/components/ui/card";
import { LuBookCopy } from "react-icons/lu";
function AdminProductVariantsHeader() {
  return (
    <CardHeader className="p-0">
      <CardTitle className="flex justify-center w-fit font-light text-gray-600 p-0">
        <LuBookCopy />
        &nbsp; Variants
      </CardTitle>
    </CardHeader>
  );
}

export default AdminProductVariantsHeader;
