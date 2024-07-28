import { MapsProvider } from "@/components/maps/MapsProvider";
import { Navigation } from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapsProvider>
        {children}
        <Navigation />
      </MapsProvider>
    </>
  );
}
