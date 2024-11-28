import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions, SessionData } from "@/lib/session-constants";

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  const { username = "No username" } = (await request.json()) as {
    username: string;
  };

  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return Response.json(session);
}

export async function PATCH() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  session.updateConfig({
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      expires: new Date("2024-12-27T00:00:00.000Z"),
      maxAge: undefined,
    },
  });
  await session.save();

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}