// app/hijab/[id]/page.js (Server Component)
import HijabDetailClient from "./HijabDetailClient";

export default function Page({ params }) {
  const { id } = params; // Server Component: safe
  return <HijabDetailClient hijabId={id} />;
}
