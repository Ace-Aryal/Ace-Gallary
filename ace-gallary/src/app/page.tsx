import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { images as imageSchema } from "~/server/db/schema";
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
  const user = await auth();

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: eq(imageSchema.userId, user.userId),
  });
  return (
    <main className="flex flex-wrap justify-center gap-3 py-4">
      {images.map((image, index) => (
        <div className="w-48 rounded-lg bg-gray-200 p-2 break-all" key={index}>
          <img
            className="aspect-square w-48 rounded-md object-cover shadow"
            src={image.url}
            alt={image.id}
          />
          <p className="px-2">{image.name}</p>
        </div>
      ))}
    </main>
  );
}
