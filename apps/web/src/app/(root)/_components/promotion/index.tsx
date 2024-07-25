"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { imageUrl } from "@/utils/imageUrl";
import Link from "next/link";

export const Promotion = ({ datas }: { datas: PromotionType[] | null }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    setProgress((100 / (count || 100)) * current);
  }, [current, count, progress]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[Autoplay({ delay: 10000 })]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {datas?.length
          ? datas.map((data) => (
              <CarouselItem
                key={data?.id}
                className="flex h-[400px] w-full items-center justify-center bg-muted-foreground/10 md:h-[500px]"
              >
                <Link href={`/promotion/${data?.id}`} className="relative size-full overflow-hidden rounded-b-none xl:rounded-b-md">
                  <Image src={imageUrl.webp(data?.image?.name, "/pc.jpg")} alt={`${data?.title}`} fill className="object-cover" />
                </Link>
              </CarouselItem>
            ))
          : "No Promotion"}
      </CarouselContent>
      <Progress value={progress} className="absolute bottom-8 left-1/2 h-2 w-1/4 -translate-x-1/2 bg-background/50" />
    </Carousel>
  );
};
