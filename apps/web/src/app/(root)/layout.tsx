import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { MapsProvider } from "@/components/maps/MapsProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <MapsProvider> */}
      {/* <Navigation /> */}
      {/* <Header /> */}
      {children}
      {/* </MapsProvider> */}
    </>
  );
}
