import { currentUser } from "@clerk/nextjs/server";
import Modal from "~/components/ui/modal";
import ViewImageCard from "~/components/ui/view-image-card";
import { getImage } from "~/utils/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const user = await currentUser();
  const idAsNumber = Number(photoId);
  console.log("on modal");
  if (isNaN(idAsNumber)) {
    throw new Error("Unauthorized");
  }
  const image = await getImage(idAsNumber);
  return (
    <div className="flex h-full w-full flex-1 justify-center">
      <Modal>
        <ViewImageCard username={user?.fullName ?? ""} image={image} />
      </Modal>
    </div>
  );
}
