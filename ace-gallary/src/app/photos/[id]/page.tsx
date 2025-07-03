import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { getImage } from "~/utils/queries";
export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Unauthorized");
  }
  const image = await getImage(idAsNumber);
  const user = await currentUser();
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div>
        <Image
          width={400}
          height={400}
          className="aspect-square w-96 rounded-md object-cover shadow"
          src={image.url}
          alt={image.name}
        />
        <p className="text-sm text-gray-600">
          {image.createdAt.toLocaleDateString()}
        </p>
        <p className="break-all">{image.name}</p>
        {user?.fullName && (
          <p className="text-sm font-semibold break-all">
            Uploaded By:{user.fullName}
          </p>
        )}
      </div>
    </div>
  );
}
