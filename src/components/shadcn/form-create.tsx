import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ReactElement, useRef, useState } from "react";
import {
  Binoculars,
  BriefcaseBusiness,
  Calendar,
  Camera,
  Check,
  Dumbbell,
  Locate,
  LocateFixed,
  Star,
  Utensils,
} from "lucide-react";
import { ToggleGroup } from "../ui/toggle-group";
import { ToogleGroupItem } from "./toogle-group-item";
import { Textarea } from "../ui/textarea";
import { Images } from "./carousel";
import { addMarker } from "@/utils/indexedDBhelpers";
import { useStore } from "@/zustand";
import { shuffle } from "@/utils";
import { experiences } from "@/categories";
import { toaster } from "./app-toaster";
import { Tooltip } from "./app-tooltip";

export const FormCreate = () => {
  const { setValue } = useStore((state) => state);
  const ref = useRef(null);
  const [images, setImages] = useState<File[]>([]);
  const [poi, setPoi] = useState<{
    address: string;
  }>({
    address: "",
  });

  const [geo, setGeo] = useState<{
    id: string;
    address: string;
    lat: number;
    lng: number;
    category:
      | "bird_watching"
      | "food_rating"
      | "workspace"
      | "event"
      | "gym"
      | null;
    type: string;
    description: string;
  }>({
    id: Date.now().toString(),
    address: "",
    category: null,
    lat: 0,
    lng: 0,
    type: "",
    description: "",
  });

  function shuffleIcons(category: string | null) {
    if (!category) return "";

    const found = experiences.find((ex) => ex.cateogry.type === category);
    if (found && found.cateogry.images.length > 0) {
      return shuffle(found.cateogry.images)[0].url;
    }

    return "";
  }

  const markerType: { value: string; icon: ReactElement; tooltip: string }[] = [
    {
      icon: <Binoculars className="h-4 w-4" />,
      value: "bird_watching",
      tooltip: "Bird Watching",
    },
    {
      icon: <Utensils className="h-4 w-4" />,
      value: "food_rating",
      tooltip: "Food Rating",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      value: "event",
      tooltip: "Event",
    },
    {
      icon: <Dumbbell className="h-4 w-4" />,
      value: "gym",
      tooltip: "Gym",
    },
    {
      icon: <BriefcaseBusiness className="h-4 w-4" />,
      value: "workspace",
      tooltip: "Workspace",
    },
  ];

  async function getLatLng(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!poi.address) return;

    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: poi.address }, (results, status) => {
        if (results && status === "OK") {
          const formatted_address = results[0].formatted_address;
          const { lat, lng } = results[0].geometry.location;
          const latitude = lat();
          const longitude = lng();
          setGeo((prev) => ({
            ...prev,
            address: formatted_address,
            lat: latitude,
            lng: longitude,
          }));
        } else {
          console.error("Geocode failed: " + status);

          setGeo((prev) => ({
            ...prev,
            address: "",
          }));

          setPoi({ address: "" });

          toaster({
            title: "Oops!",
            description: "Unable to find location.",
            action: { label: "Ok", onClick: () => {} },
          });
        }
      });
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  const getCurrentLocation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (results && status === "OK") {
                const formatted_address = results[0].formatted_address;
                const { lat, lng } = results[0].geometry.location;
                const latitude = lat();
                const longitude = lng();
                setGeo((prev) => ({
                  ...prev,
                  address: formatted_address,
                  lat: latitude,
                  lng: longitude,
                }));
              } else {
                console.error("Geocode failed: " + status);

                toaster({
                  title: "Oops!",
                  description: "Unable to find location.",
                  action: { label: "Ok", onClick: () => {} },
                });
              }
            });
          } catch (err) {
            console.error("Fetch error:", err);
            return null;
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleImage = () => {
    if (ref.current) {
      ref.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        setImages((prev) => [...prev, file]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const [rating, setRating] = useState<number>(0);

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>Create your experience</CardTitle>
        <CardDescription>
          Create new experiences around you-map what matters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex">
                <Input
                  id="location"
                  autoComplete="off"
                  type="text"
                  placeholder="Enter location e.g. block name, postal code or full address"
                  value={poi.address}
                  onChange={(e) =>
                    setPoi((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
                <div className="items-center pl-1 flex gap-1">
                  <Tooltip tooltip="Find Location">
                    <Button variant="outline" size="sm" onClick={getLatLng}>
                      <Locate />
                    </Button>
                  </Tooltip>
                  <Tooltip tooltip="Set Current Location">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                    >
                      <LocateFixed />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              {geo.address && (
                <div className="flex gap-3">
                  <Check size="20" />
                  <Label htmlFor="formatted_addess">{geo.address}</Label>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="latLbl" className="flex-1">
                  Latitude
                </Label>
                <CardDescription>
                  <Label htmlFor="lat">{geo.lat}</Label>
                </CardDescription>
              </div>
              <div className="flex items-center">
                <Label htmlFor="lngLbl" className="flex-1">
                  Longitude
                </Label>
                <CardDescription>
                  <Label htmlFor="lng">{geo.lng}</Label>
                </CardDescription>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="experience" className="flex-1">
                Experience
              </Label>
              <div className="flex items-center">
                <ToggleGroup
                  variant="outline"
                  size="lg"
                  type="single"
                  onValueChange={(val) =>
                    setGeo((prev) => ({
                      ...prev,
                      category: val as keyof typeof prev.category,
                    }))
                  }
                >
                  {markerType.map((mark, index) => (
                    <ToogleGroupItem
                      key={index}
                      icon={mark.icon}
                      value={mark.value}
                      style={
                        mark.value === geo.category
                          ? { backgroundColor: "#71797E" }
                          : undefined
                      }
                      tooltip={mark.tooltip}
                    />
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Rating</Label>
              <span className="flex">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    fill="#fff"
                    onClick={() => setRating((prev) => (prev = i + 1))}
                  />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => setRating((prev) => (prev = prev + (i + 1)))}
                  />
                ))}
              </span>
            </div>

            <div>
              <Label htmlFor="comments" className="pb-3">
                Upload images
              </Label>
              <input
                hidden
                type="file"
                multiple={true}
                accept="image/*"
                ref={ref}
                onChange={handleFileChange}
              />
              <Button variant="outline" size="sm" onClick={handleImage}>
                <Camera />
              </Button>
              <div className="flex flex-1 justify-center">
                <Images images={images} removeImage={removeImage} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comments">Note your experience</Label>
              <Textarea
                placeholder="Comment your experience here."
                value={geo.description}
                onChange={(e) =>
                  setGeo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          onClick={async () => {
            try {
              await addMarker({
                ...geo,
                iconUrl: shuffleIcons(geo.category),
                images: images,
                rating,
              });

              //clearing states
              setGeo({
                address: "",
                category: null,
                description: "",
                id: Date.now().toString(),
                lat: 0,
                lng: 0,
                type: "",
              });
              setRating(0);
              setPoi({ address: "" });
              setImages([]);
              setValue(shuffle("change".split("")).join(""));

              toaster({
                title: "Hooray!",
                description:
                  "You have added your experience on the map successfully.",
                action: {
                  label: "Ok",
                  onClick: () => {},
                },
              });
            } catch (e) {
              console.error("error ", e);
              toaster({
                title: "Oops!",
                description: "Unable to add experience.",
                action: {
                  label: "Ok",
                  onClick: () => {},
                },
              });
            }
          }}
          disabled={!geo.address || !geo.category}
        >
          Add Experience
        </Button>
      </CardFooter>
    </Card>
  );
};
