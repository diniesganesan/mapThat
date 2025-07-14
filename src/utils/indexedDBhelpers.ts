const DB_NAME = "GoogleMapsHackathon";
const DB_VERSION = 1;
const STORE_NAME = "markers";

export interface Marker {
  id: number;
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
  iconUrl: string;
  images: File[];
  rating: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addMarker(marker: Omit<Marker, "id">): Promise<number> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(marker);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
}

async function getMarker(id: number): Promise<Marker | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllMarkers(): Promise<Marker[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Marker[]);
    request.onerror = () => reject(request.error);
  });
}

async function updateMarker(marker: Marker): Promise<void> {
  if (!marker.id) throw new Error("User must have an id to be updated");
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(marker);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function removeMarker(marker: Marker): Promise<void> {
  if (!marker.id) throw new Error("User must have an id to be updated");
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(marker.id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export { addMarker, getAllMarkers, getMarker, updateMarker, removeMarker };
