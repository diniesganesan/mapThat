import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { API_KEY } from "@/utils/constants";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Loader } from "@googlemaps/js-api-loader";
import { TabUI } from "@/components/shadcn/app-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/zustand";
import { addCustomMarkers } from "@/utils";

const Home = () => {
  const isMobile = useIsMobile();
  const [apiLoaded, setApiLoaded] = useState(false);
  const { value, setMap } = useStore((state) => state);

  const [tab, setTab] = useState<string>("log");

  const mapPoi = document.getElementById("map");

  useEffect(() => {
    if (apiLoaded && window.google && navigator.onLine) {
      if (mapPoi) {
        const map = new google.maps.Map(mapPoi, {
          center: { lat: 1.3649170000000002, lng: 103.82287200000002 },
          zoom: 11.9,
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        if (tab === "log") addCustomMarkers(map, mapPoi, setMap);
      }
    }
  }, [apiLoaded, value, tab]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "GOOGLE_MAPS_API_KEY",
      version: "weekly",
    });

    loader.load().then(() => {
      setApiLoaded(true);
    });
  }, []);

  return (
    <ResizablePanelGroup
      direction={isMobile ? "vertical" : "horizontal"}
      className="min-h-[100%] max-w-md rounded-lg border md:min-w-[100%]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full p-6">
          <TabUI setTab={setTab} tab={tab} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <APIProvider apiKey={API_KEY}>
            <Map
              id="map"
              style={{ width: "100%", height: "100%" }}
              defaultCenter={{ lat: 1.28583, lng: 103.81944 }}
              defaultZoom={15}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
          </APIProvider>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
