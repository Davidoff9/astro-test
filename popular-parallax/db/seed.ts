import { db, Comment } from "astro:db";

export default async function seed() {
  await db.insert(Comment).values([
    {
      name: "David",
      email: "david@mail.com",
      message: "First FB entry",
    },
  ]);
}
