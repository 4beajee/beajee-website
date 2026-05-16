import { appEndpoint } from "@/lib/app-url";
import { proxyJson } from "@/lib/proxy";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;
  return proxyJson(appEndpoint(`/api/feed/${encodeURIComponent(matchId)}`));
}
