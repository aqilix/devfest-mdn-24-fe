import React from 'react'
import { redirect } from 'next/navigation';
import { pathname } from 'next-extra/pathname';

import { authenticatedRoutePathUrl } from "@/services/api/modules/authenticated-route"

export default async function RootTemplate({ children }: { children: React.ReactNode }) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${authenticatedRoutePathUrl}`)
  const authenticatedRouteResult = await response.json()

  const route = await pathname(); // /hello
  if (typeof authenticatedRouteResult?.message !== "string" && route !== '/signin') {
    redirect("/signin")
  } else if (typeof authenticatedRouteResult?.message == "string" && route === '/signin') {
    redirect("/playground")
  }

  return children
}