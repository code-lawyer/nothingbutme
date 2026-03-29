import Navbar from "@/components/Navbar";
import { getProfile } from "@/lib/content";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = getProfile();

  return (
    <>
      <Navbar siteName={profile.name} />
      {children}
    </>
  );
}
