import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CircleX } from "lucide-react";

interface Props {
  images: File[];
  removeImage: (index: number) => void;
}
export function Images({ images, removeImage }: Props) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <CardContent className="group flex aspect-square items-center justify-center">
                <img src={URL.createObjectURL(image)} className="rounded-xl" />
                <CircleX
                  className="absolute hidden group-hover:block cursor-pointer opacity-[0.8]"
                  onClick={() => removeImage(index)}
                />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 0 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
