import { appEndpoint } from "@/lib/app-url";
import { proxyJson } from "@/lib/proxy";

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  return proxyJson(appEndpoint("/api/stats", search));
}
