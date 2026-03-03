"use client";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import GenderSelect from "./GenderSelect";
import SeoTags from "./SeoTags";

function SEO() {
  return (
    <div className="flex flex-col gap-4 mt-4 sm:mt-2">
      <div className="grid grid-cols-1 gap-4 sm:mt-3 sm:grid-cols-3 sm:gap-10 mb-0">
        <div>
          <FormInput name="seoTitle" type="text" label="SEO Title" />
        </div>
        <div>
          <SeoTags />
        </div>
        <div>
          <GenderSelect />
        </div>
      </div>
      <div>
        <TextArea
          name="seoDescription"
          labelText="SEO Description"
          placeholder="Enter SEO Description"
        />
      </div>
    </div>
  );
}

export default SEO;
