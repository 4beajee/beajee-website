import { appEndpoint } from "@/lib/app-url";
import { proxyJson } from "@/lib/proxy";

export async function GET() {
  return proxyJson(appEndpoint("/api/github/repo"));
}
