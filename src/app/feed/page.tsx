import { redirect } from "next/navigation";
import { appUrl } from "@/lib/app-url";

export default function FeedRedirectPage() {
  redirect(new URL("/feed", appUrl).toString());
}
