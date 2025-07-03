import "server-only";
// Data access layer
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
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
    throw new Error("No image found");
  }
  if (user.userId !== image.userId) {
    throw new Error("Unauthorized");
  }
  return image;
};
