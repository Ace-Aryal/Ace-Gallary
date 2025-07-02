import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="flex flex-wrap justify-center gap-3 py-4">
      {[...images, ...images, ...images].map((image, index) => (
        <div className="w-48" key={index}>
          <img
            className="aspect-square object-cover"
            src={image.url}
            alt={image.id}
          />
        </div>
      ))}
    </main>
  );
}
