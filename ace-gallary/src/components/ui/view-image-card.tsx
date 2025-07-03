import Image from "next/image";
import React from "react";

import type { Image as TImage } from "~/server/db/schema";
import DeleteButton from "../delete-buton";
import { deleteImage } from "~/utils/queries";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function ViewImageCard({
  image,
  username,
}: {
  image: TImage;
  username: string;
}) {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-50 p-2 shadow-lg">
      <Image
        width={400}
        height={400}
        className="aspect-square w-96 rounded-md object-cover shadow"
        src={image.url}
        alt={image.name}
      />
      <div className="flex w-full items-center justify-between gap-2 p-2">
        <div className="w-3/4">
          {" "}
          <p className="text-sm text-gray-600">
            {image.createdAt.toDateString()}
          </p>
          <p className="break-all">{image.name}</p>
          {username && (
            <p className="text-sm font-semibold break-all">
              Uploaded By:{username}
            </p>
          )}
        </div>
        <div className="w-1/4">
          <form
            action={async () => {
              "use server";
              await deleteImage(image.id);
            }}
          >
            <DeleteButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewImageCard;
