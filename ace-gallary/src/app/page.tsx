import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { twMerge } from "tailwind-merge";

import { getMyImages } from "~/utils/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="grid h-full w-full place-items-center">
          <p>Please sign in</p>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </>
  );
}
async function Images() {
  const images = await getMyImages();
  return (
    <main className="flex flex-wrap justify-center gap-3 py-4">
      {images.map((image) => (
        <Link href={`/photos/${image.id}`} key={image.id}>
          <div
            className="h-full w-48 rounded-lg bg-gray-200 p-2 break-all"
            key={image.id}
          >
            <Image
              width={192}
              height={192}
              className="aspect-square w-48 rounded-md object-cover shadow"
              src={image.url}
              alt={image.name}
            />
            <p className="px-2">{image.name}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
