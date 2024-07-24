import useAuthStore from "@/stores/auth.store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useLocation } from "@/stores/latLng.store";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useMediaQueries } from "@/hooks/use-media-queries";
import { Maps } from "../maps";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

export const HeaderPlaces = () => {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const { matches } = useMediaQueries("(min-width: 640px)"); // isDesktop
  const { location } = useLocation();
  const label = location?.address_components.find((address) => address.types.find((type) => type === "administrative_area_level_3"));

  if (matches)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" disabled={!label} className="max-sm:p-0 max-sm:py-0">
            {label ? (
              <p className="flex items-center gap-1.5">
                <MapPin className="inline-block size-4" />
                <span className="inline-block text-sm">
                  Send to&nbsp;<span className="font-semibold">{label?.short_name}</span>
                </span>
                <ChevronDown className="inline-block" />
              </p>
            ) : (
              <p>Cannot access your location</p>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select detail location</DialogTitle>
            <DialogDescription className="text-balance">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, modi reprehenderit.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Maps zoom={matches ? 18 : 19} className="space-y-4" marker />
          </div>

          <DialogFooter>
            <DialogDescription>
              Orders for tomorrow that are paid before 12pm will be shipped tomorrow. After that, it will be shipped the day after.
              operational hours end before 5pm.
            </DialogDescription>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" disabled={!label} className="max-sm:p-0 max-sm:py-0">
          {label ? (
            <p className="flex items-center gap-1.5">
              <MapPin className="inline-block size-4" />
              <span className="inline-block text-sm">
                Send to&nbsp;<span className="font-semibold">{label?.short_name}</span>
              </span>
              <ChevronDown className="inline-block" />
            </p>
          ) : (
            <p>Cannot access your location</p>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select detail location</DrawerTitle>
          <DrawerDescription className="text-balance">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, modi reprehenderit.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <DrawerClose asChild>
            <Link href="/">
              <Maps zoom={matches ? 18 : 19} className="pointer-events-none" />
            </Link>
          </DrawerClose>
        </div>

        <DrawerFooter>
          <DrawerDescription>
            Orders for tomorrow that are paid before 12pm will be shipped tomorrow. After that, it will be shipped the day after.
            operational hours end before 5pm.
          </DrawerDescription>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
