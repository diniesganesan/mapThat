import { create } from "zustand";

interface StateProps {
  value: string;
  googleMap: {
    map: google.maps.Map | null;
    marker: google.maps.Marker | null;
    mapPoi: HTMLElement | null;
  };
  mapCircle: google.maps.Circle | null;
  setValue: (val: string) => void;
  resetValue: () => void;
  setMap: (maps: {
    map: google.maps.Map | null;
    marker: google.maps.Marker | null;
    mapPoi: HTMLElement | null;
  }) => void;
  setCircle: (circle: google.maps.Circle | null) => void;
}

export const useStore = create<StateProps>((set) => ({
  value: "",
  googleMap: {
    map: null,
    marker: null,
    mapPoi: null,
  },
  mapCircle: null,
  setValue: (val: string) => set({ value: val }),
  resetValue: () => set({ value: "" }),
  setMap: (maps: {
    map: google.maps.Map | null;
    marker: google.maps.Marker | null;
    mapPoi: HTMLElement | null;
  }) => set({ googleMap: maps }),
  setCircle: (circle: google.maps.Circle | null) => set({ mapCircle: circle }),
}));
