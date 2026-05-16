export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.gennety.com";

export function appEndpoint(pathname: string, search = "") {
  return new URL(`${pathname}${search}`, appUrl);
}
