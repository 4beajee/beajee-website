import { appEndpoint } from "@/lib/app-url";
import { proxyJson } from "@/lib/proxy";

const FORWARDED_HEADERS = [
  "content-type",
  "cookie",
  "user-agent",
  "x-forwarded-for",
  "x-real-ip",
  "cf-ipcountry",
  "x-vercel-ip-country",
  "origin",
  "referer",
] as const;

function consentProxyHeaders(request: Request): Headers {
  const headers = new Headers();
  headers.set("content-type", request.headers.get("content-type") ?? "application/json");

  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  return headers;
}

export async function POST(request: Request) {
  const body = await request.text();
  return proxyJson(appEndpoint("/api/consent"), {
    method: "POST",
    headers: consentProxyHeaders(request),
    body
  });
}
