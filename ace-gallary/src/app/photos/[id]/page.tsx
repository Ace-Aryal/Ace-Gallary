import { currentUser } from "@clerk/nextjs/server";
import ViewImageCard from "~/components/ui/view-image-card";
import { getImage } from "~/utils/queries";
export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const user = await currentUser();
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Unauthorized");
  }
  console.log("on page");
  const image = await getImage(idAsNumber);
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <ViewImageCard username={user?.fullName ?? ""} image={image} />
    </div>
  );
}
