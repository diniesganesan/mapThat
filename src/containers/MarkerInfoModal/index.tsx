import { toaster } from "@/components/shadcn/app-toaster";
import { Images } from "@/components/shadcn/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { shuffle } from "@/utils";
import { Marker, removeMarker } from "@/utils/indexedDBhelpers";
import { useStore } from "@/zustand";
import { CircleMinus, Star } from "lucide-react";

interface Props {
  marker: Marker;
}
const MarkerInfoModal = ({ marker }: Props) => {
  const { setValue } = useStore((state) => state);
  const deleteMarker = async () => {
    try {
      await removeMarker(marker);
      setValue(shuffle("change".split("")).join(""));
      toaster({
        title: "Experience Removed",
        description: "You have removed your experience on the map successfully.",
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
    } catch (e) {
      console.error(e);
      toaster({
        title: "Error",
        description: "Error removing experience.",
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div className="text-black">
      <div className="grid gap-2">
        <Label>Location</Label>
        <Label className="text-gray-600">{marker.address}</Label>
      </div>
      {marker.category && marker.category !== "bird_watching" && (
        <div className="grid gap-2">
          <Label className="pt-3">Rating</Label>
          <span className="flex">
            {Array.from({ length: marker.rating }).map((_, i) => (
              <Star key={i} fill="#7B1818" color="#7B1818" size="20" />
            ))}
            {Array.from({ length: 5 - marker.rating }).map((_, i) => (
              <Star key={i} color="#7B1818" size="20" />
            ))}
          </span>
        </div>
      )}
      <div className="flex flex-1 justify-center">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {marker.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full max-w-xs rounded-xl"
                    />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
      <div className="grid gap-2">
        <Label className="pt-3">Your experience</Label>
        <Label className="text-gray-600">{marker.description}</Label>
      </div>
      <Button
        variant="default"
        size="sm"
        className="mt-3 mb-3 cursor-pointer w-[100%] bg-gray-500 text-white"
        onClick={deleteMarker}
      >
        <CircleMinus /> Remove Experience
      </Button>
    </div>
  );
};

export default MarkerInfoModal;
