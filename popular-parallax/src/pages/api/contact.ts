export const prerender = false;

import type { APIRoute } from "astro";
import { db, Comment } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }
  await db.insert(Comment).values({ name, email, message });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
