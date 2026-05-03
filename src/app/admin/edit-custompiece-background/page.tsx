import CustomPieceComponent from "../../../../components/admin/CustomPieceComponent";
import Containers from "../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCustomPieceBg } from "../../../../utils/actions";
async function CustomPieceBG() {
  const customPiece = await getCustomPieceBg();

  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Edit Custom Piece Background
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CustomPieceComponent customPiece={customPiece} />
    </Containers>
  );
}

export default CustomPieceBG;
