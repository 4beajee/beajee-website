import { NextResponse } from "next/server";

export async function proxyJson(url: URL, init?: RequestInit) {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        accept: "application/json",
        ...(init?.headers ?? {})
      },
      cache: init?.method && init.method !== "GET" ? "no-store" : init?.cache ?? "no-store"
    });

    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json"
      }
    });
  } catch {
    return NextResponse.json({ error: "Upstream app unavailable" }, { status: 502 });
  }
}
