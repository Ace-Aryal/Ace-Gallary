import Image from "next/image";
import { getImage } from "~/utils/queries";

export default async function PhotoModal({
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
  return (
    <Image
      width={192}
      height={192}
      className="aspect-square w-96 rounded-md object-cover shadow"
      src={image.url}
      alt={image.name}
    />
  );
}
