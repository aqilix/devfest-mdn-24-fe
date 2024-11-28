import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from '@/lib/session-constants';

export default async function RootTemplate({ children }: { children: React.ReactNode }) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    redirect("/signin");
  }

  return children
}