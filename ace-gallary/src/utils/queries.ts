import "server-only";
// Data access layer
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
export const getMyImages = async () => {
  const user = await auth();

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.userId, user.userId!),
  });
  return images;
};

export const getImage = async (id: number) => {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  if (!id) {
    throw new Error("Invalid id");
  }
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) {
    redirect("/");
  }
  if (user.userId !== image.userId) {
    throw new Error("Unauthorized");
  }
  return image;
};

export const deleteImage = async (id: number) => {
  const user = await auth();

  if (!id || !user?.userId) {
    throw new Error("Invalid id or userId");
  }
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  console.log("deleted");
  revalidatePath(`/photos/${id}`);
  revalidatePath("/");

  console.log("revalidated");
  redirect("/");
};
