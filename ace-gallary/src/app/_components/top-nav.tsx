"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { duration } from "drizzle-orm/gel-core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { toast } from "sonner";
import { UploadButton } from "~/utils/uploadthing";
export default function TopNav() {
  const router = useRouter();
  let toastId: string | number;
  return (
    <header className="w-full border-b border-gray-300 p-1 px-4 text-xl font-semibold sm:px-6">
      {" "}
      <nav className="flex w-full items-center justify-between">
        <Link href="/">
          <div className="text-3xl font-semibold">Gallery</div>
        </Link>
        <div>
          <SignedOut>
            <SignInButton>
              <button className="rounded-xl bg-blue-100 px-4 py-1.5 text-sm text-blue-600 shadow-sm transition-colors duration-200 hover:bg-blue-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              {" "}
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button: {
                    color: "#2563eb", // text-blue-600
                    backgroundColor: "#dbeafe", // bg-blue-100
                    border: "1px solid #2563eb",
                  },
                  allowedContent: "hidden",
                }}
                onUploadBegin={() => {
                  toast.info(
                    "Upload Started, click the progress buton to abort",
                    {
                      duration: 2000,
                    },
                  );
                  toastId = toast.loading("Uploading", {
                    duration: 1000 * 60 * 60,
                  });
                }}
                content={{
                  button: "Upload Image",
                }}
                onUploadAborted={() => {
                  toast.info("Upload Aborted");
                  toast.dismiss(toastId);
                }}
                onUploadError={(error) => {
                  toast.error("Upload Failed : " + error.message);
                  toast.dismiss(toastId);
                }}
                onClientUploadComplete={() => {
                  router.refresh();
                  toast.success("Image uploaded sucessfully");
                  toast.dismiss(toastId);
                }}
              />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
