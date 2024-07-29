"use client";
import { Product, ProductVariant } from "@/models/product.model";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { Button } from "../ui/button";
import { Carousel, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem, SliderThumbItem } from "../ui/carousel.vercel";

type Props = { product: Product };
export default function ProductCarousel({ product }: Props) {
  return (
    <Carousel>
      <CarouselMainContainer className="h-full">
        {product.variants.map((variant: ProductVariant) => (
          <SliderMainItem key={variant.id}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${NEXT_PUBLIC_BASE_API_URL}/images/${variant.images.name}`}
                alt={`${variant.name}'s image`}
                fill={true}
                sizes="100"
                className="aspect-square rounded-md object-cover"
              />
            </AspectRatio>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {product.variants.map((variant: ProductVariant, i) => (
          <SliderThumbItem key={variant.id} index={i} className="h-16 bg-transparent">
            <Button type="button" className="w-full">
              {variant.name}
            </Button>{" "}
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
}
