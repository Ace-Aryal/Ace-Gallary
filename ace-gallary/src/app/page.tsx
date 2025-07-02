import { db } from "~/server/db";
export const dynamic = "force-dynamic";
const initialURLs = [
  "https://iqfvwphdv7.ufs.sh/f/HajIZ7bSvaZwRXn9yLifsetlmpKoHFQvUiSPOTuh6rx5qMg0",
  "https://iqfvwphdv7.ufs.sh/f/HajIZ7bSvaZwcfPlLgoozTvpBrwqmZ03WOL5yacfsulYKF1g",
  "https://iqfvwphdv7.ufs.sh/f/HajIZ7bSvaZwMwqyYiuSBGFh2ymDVL7HnNJqvpfOlCro895d",
];
const initialImages = initialURLs.map((URL, index) => ({
  id: index + 1,
  URL,
}));
export default async function HomePage() {
  const postsRes = await db.query.posts.findMany();
  console.log(postsRes, "posts res");
  return (
    <main className="flex flex-wrap justify-center gap-3 py-4">
      {postsRes.map((post) => (
        <p key={post.id}>{post.name}</p>
      ))}
      {[
        ...initialImages,
        ...initialImages,
        ...initialImages,
        ...initialImages,
      ].map((image, index) => (
        <div className="w-48" key={index}>
          <img
            className="aspect-square object-cover"
            src={image.URL}
            alt="images"
          />
        </div>
      ))}
    </main>
  );
}
