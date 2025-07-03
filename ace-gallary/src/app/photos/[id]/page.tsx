export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  console.log("photo id", photoId);
  return <div className="w-16 bg-red-600 text-black">{photoId}</div>;
}
