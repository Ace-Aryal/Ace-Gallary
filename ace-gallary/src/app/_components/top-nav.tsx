"use client";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadButton } from "~/utils/uploadthing";
export default function TopNav() {
  const router = useRouter();
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
                appearance={{
                  button: {
                    color: "#2563eb", // text-blue-600
                    backgroundColor: "#dbeafe", // bg-blue-100
                    border: "1px solid #2563eb",
                  },
                  allowedContent: "hidden",
                }}
                content={{
                  button: "Upload Image",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={() => {
                  router.refresh();
                  toast.success("Image uploaded sucessfully");
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
