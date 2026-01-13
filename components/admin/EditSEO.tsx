import { Product } from "@/generated/prisma";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import SeoTags from "./SeoTags";
function EditSEO({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col sm:grid sm:gap-10 sm:grid-cols-2  justify-between">
        <div>
          <FormInput
            name="seoTitle"
            type="text"
            label="SEO Title"
            defaultValue={product.seoTitle}
          />
        </div>
        <div>
          <SeoTags product={product} />
          <div className="flex gap-2 mt-2 flex-wrap"></div>
        </div>
      </div>
      <div>
        <TextArea
          name="seoDescription"
          labelText="SEO Description"
          placeholder="Enter SEO Description"
          defaultValue={product.seoDescription}
        />
      </div>
    </div>
  );
}

export default EditSEO;
