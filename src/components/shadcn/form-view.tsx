import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useStore } from "@/zustand";
import { Loader } from "@googlemaps/js-api-loader";
import { Locate } from "lucide-react";
import { Combobox } from "./app-dropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { addCustomMarkers, filterMarkersWithinRadius } from "@/utils";
import { getAllMarkers } from "@/utils/indexedDBhelpers";

export const FormView = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const { googleMap, mapCircle, setCircle, setMap } = useStore(
    (state) => state
  );

  const [apiLoaded, setApiLoaded] = useState(false);
  const [value, setValue] = useState("");

  // const radius = 3000; // Radius in meters

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation((prev) => ({
            ...prev,
            lat,
            lng,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "GOOGLE_MAPS_API_KEY",
      version: "weekly",
    });

    loader.load().then(() => {
      setApiLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (apiLoaded && window.google && navigator.onLine) {
      if (googleMap.mapPoi) {
        createCircle();
      }
    }
  }, [apiLoaded, location]);

  useEffect(() => {
    if (location.lat !== 0 && location.lng !== 0) {
      (async () => {
        const markers = await getAllMarkers();
        const filteredMarkers = filterMarkersWithinRadius(
          markers,
          location.lat,
          location.lng,
          3000,
          value
        );

        if (!googleMap.mapPoi) return;
        const map = new google.maps.Map(googleMap.mapPoi, {
          center: { lat: 1.3649170000000002, lng: 103.82287200000002 },
          zoom: 11.9,
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        addCustomMarkers(
          map,
          googleMap.mapPoi,
          setMap,
          filteredMarkers,
          location,
          setCircle
        );
      })();
    }
  }, [value, location.lat, location.lng]);

  function createCircle() {
    if (mapCircle) mapCircle.setMap(null);

    const circle = new google.maps.Circle({
      strokeColor: "#4285F4",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#4285F4",
      fillOpacity: 0.35,
      map: googleMap.map,
      center: { lat: location.lat, lng: location.lng },
      radius: 3000, // Radius in meters
    });

    setCircle(circle);
  }

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>Explore your experience</CardTitle>
        <CardDescription>
          Re-explore these experiences marked by you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex">
                <Label htmlFor="location" className="flex-1">
                  Your current location
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Locate size={20} onClick={createCircle} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-gray-600">Capture current location</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex">
                <Label className="flex-1">Latitude</Label>
                <CardDescription>
                  <Label className="">{location.lat}</Label>
                </CardDescription>
              </div>
              <div className="flex">
                <Label className="flex-1">Longitude</Label>
                <CardDescription>
                  <Label className="">{location.lng}</Label>
                </CardDescription>
              </div>
            </div>
            <div className="grid gap-2">
              <Combobox handleComboboxValue={setValue} value={value} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center"></div>
            </div>
            <div className="grid gap-2">
              <span className="flex"></span>
            </div>
            <div>
              <div className="flex flex-1 justify-center"></div>
            </div>
            <div className="grid gap-2"></div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};
