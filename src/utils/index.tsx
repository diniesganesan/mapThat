import { Home } from "lucide-react";
import { Landing, MarkerInfoModal } from "@/containers/index";
import { getAllMarkers, Marker } from "./indexedDBhelpers";
import { createRoot } from "react-dom/client";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export const navigator = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    element: <Landing />,
  },
];

export function shuffle<T>(array: T[]) {
  const arr = [...array]; // create a copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

export function getDistanceFromLatLngInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

export function filterMarkersWithinRadius(
  markers: Marker[],
  userLat: number,
  userLng: number,
  radius: number,
  category: string
) {
  return markers
    .filter((marker) => {
      const distance = getDistanceFromLatLngInMeters(
        userLat,
        userLng,
        marker.lat,
        marker.lng
      );
      return distance <= radius;
    })
    .filter((marker) => (!category ? true : marker.category === category));
}

export async function addCustomMarkers(
  map: google.maps.Map,
  mapPoi: HTMLElement | null,
  setMap: (maps: {
    map: google.maps.Map | null;
    marker: google.maps.Marker | null;
    mapPoi: HTMLElement | null;
  }) => void,
  markers?: Marker[],
  location?: { lat: number; lng: number },
  setCircle?: (circle: google.maps.Circle | null) => void
) {
  try {
    if (!mapPoi) return;

    if (location) {
      const circle = new google.maps.Circle({
        strokeColor: "#4285F4",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#4285F4",
        fillOpacity: 0.35,
        map: map,
        center: { lat: location.lat, lng: location.lng },
        radius: 3000, // Radius in meters
      });

      setCircle && setCircle(circle);
    }

    const response = markers ? markers : await getAllMarkers();
    if (response.length === 0) setMap({ map, marker: null, mapPoi });

    if (response.length > 0) {
      let markers: google.maps.Marker[] = [];
      response.forEach((mark, _index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: mark.lat, lng: mark.lng },
          map,
          icon: {
            url: mark.iconUrl,
            scaledSize: new window.google.maps.Size(30, 30),
          },
          title: mark.description,
          animation: google.maps.Animation.DROP,
        });

        markers.push(marker);
        setMap({ map, marker, mapPoi });

        const container = document.createElement("div");
        createRoot(container).render(<MarkerInfoModal marker={mark} />);

        const infoWindow = new google.maps.InfoWindow({
          content: container,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        map.addListener("click", () => {
          infoWindow.close();
        });
      });

      const clusterer = new MarkerClusterer({ map, markers });
    }
  } catch (e) {}
}
