import { CardHeader, CardTitle } from "@/components/ui/card";
import { FaBoxOpen } from "react-icons/fa6";

function AdminCardHeader() {
  return (
    <CardHeader>
      <CardTitle className="flex justify-center w-fit font-light text-gray-600">
        <FaBoxOpen />
        &nbsp; Details
      </CardTitle>
    </CardHeader>
  );
}

export default AdminCardHeader;
