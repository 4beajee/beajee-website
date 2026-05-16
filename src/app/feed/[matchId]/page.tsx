import { redirect } from "next/navigation";
import { appUrl } from "@/lib/app-url";

export default async function FeedMatchRedirectPage({
  params
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  redirect(new URL(`/feed/${encodeURIComponent(matchId)}`, appUrl).toString());
}
