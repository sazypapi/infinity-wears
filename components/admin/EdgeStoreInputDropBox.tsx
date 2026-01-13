"use client";

import { ImageUploader } from "@/components/upload/multi-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";

export function MultiImageDropzoneUsage() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
        options: {
          temporary: true,
        },
      });
      console.log(res);
      return res;
    },
    [edgestore]
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <ImageUploader maxFiles={10} maxSize={1024 * 1024 * 2} />
    </UploaderProvider>
  );
}
