import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { isDeepEqual } from "remeda";

/** Indianapolis (specifically, the Circle) */
export const DEFAULT_POSITION = {
  lat: 39.768402,
  lng: -86.158066,
};

const locationAtom = atom(DEFAULT_POSITION);

export const useGeolocation = () => {
  const [location, setLocation] = useAtom(locationAtom);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      },
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [setLocation]);

  return {
    current: location,
    isDefault: isDeepEqual(location, DEFAULT_POSITION),
  };
};
