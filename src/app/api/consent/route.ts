import { appEndpoint } from "@/lib/app-url";
import { proxyJson } from "@/lib/proxy";

export async function POST(request: Request) {
  const body = await request.text();
  return proxyJson(appEndpoint("/api/consent"), {
    method: "POST",
    headers: { "content-type": request.headers.get("content-type") ?? "application/json" },
    body
  });
}
