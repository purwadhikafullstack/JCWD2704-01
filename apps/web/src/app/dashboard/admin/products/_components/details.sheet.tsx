import ProductCarousel from "@/components/carousel/product.carousel";
import { Separator } from "@/components/ui/separator";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Product } from "@/models/product.model";

type Props = { product: Product };
export default function ProductDetailsSheet({ product }: Props) {
  return (
    <SheetContent className="overflow-y-auto">
      <ProductCarousel product={product} />
      <SheetHeader>
        <SheetTitle>{product.name}</SheetTitle>
        <Separator />
        <SheetTitle className="text-md">Description</SheetTitle>
        <SheetDescription>{product.description}</SheetDescription>
        <Separator />
        <SheetTitle className="text-md">Nutrition Facts</SheetTitle>
        <SheetDescription>{product.nutrition_facts}</SheetDescription>
        <Separator />
        <SheetTitle className="text-md">Shelf Life</SheetTitle>
        <SheetDescription>{product.shelf_life}</SheetDescription>
        <Separator />
        <SheetTitle className="text-md">Storage</SheetTitle>
        <SheetDescription>{product.storage_instructions}</SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
