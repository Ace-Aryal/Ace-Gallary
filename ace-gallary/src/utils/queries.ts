import "server-only";
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
