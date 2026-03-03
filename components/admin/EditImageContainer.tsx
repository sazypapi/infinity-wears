import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/generated/prisma";
import { FaImage } from "react-icons/fa";
import EditSingleImage from "./EditSingleImage";

import EditMultipleImage from "./EditMultipleImage";

function EditImageContainer({ product }: { product: Product }) {
  return (
    <Card className="w-full bg-white border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="flex justify-center flex-col w-fit font-light text-gray-600">
          <div className="flex ">
            <FaImage />
            &nbsp; Images
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Images will only be confirmed once the form is submitted.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-black">
        <EditMultipleImage product={product} />
      </CardContent>
    </Card>
  );
}

export default EditImageContainer;
