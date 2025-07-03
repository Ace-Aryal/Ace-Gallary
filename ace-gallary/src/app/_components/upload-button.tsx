import { useUploadThing } from "~/utils/uploadthing";

export default function MyUploadComponent() {
  const { startUpload, isUploading, permittedFileInfo } =
    useUploadThing("imageUploader");

  return (
    <button
      onClick={() => startUpload()}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      {isUploading ? "Uploading..." : "Upload"}
    </button>
  );
}
