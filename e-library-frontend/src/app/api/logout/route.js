

import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = cookies();
  // Delete the token cookie by sending a Set-Cookie header with Max-Age=0
  cookieStore.delete("token", { path: "/" });
  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
