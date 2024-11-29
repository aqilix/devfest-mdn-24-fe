import useSWR from "swr";
import { SessionData, defaultSession } from "@/lib/session-constants";
import useSWRMutation from "swr/mutation";

const sessionApiRoute = "/session";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

function doSignin(url: string, { arg }: { arg: string }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ username: arg }),
  });
}

function doSignout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

function doIncrement(url: string) {
  return fetchJson<SessionData>(url, {
    method: "PATCH",
  });
}

export function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    },
  );

  const { trigger: signin } = useSWRMutation(sessionApiRoute, doSignin, {
    // the login route already provides the updated information, no need to revalidate
    revalidate: false,
  });
  const { trigger: signout } = useSWRMutation(sessionApiRoute, doSignout);
  const { trigger: increment } = useSWRMutation(sessionApiRoute, doIncrement);

  return { session, signin, signout, increment, isLoading };
}
