import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  MapCameraChangedEvent,
  Pin,
  Map as ReactGoogleMap,
} from "@vis.gl/react-google-maps";
import { LocateFixedIcon, LocateIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { config } from "../config";
import { useGeolocation } from "../hooks/useGeolocation";
import { cn } from "../util/style";

export const GoogleMap: React.FC = () => {
  const geolocation = useGeolocation();
  const [trackSelf, setTrackSelf] = useState(false);
  const [camera, setCamera] = useState({
    center: geolocation.current,
    zoom: 10,
  });

  useEffect(() => {
    if (trackSelf) {
      setCamera((prev) => ({ ...prev, center: geolocation.current }));
    }
  }, [geolocation.current, trackSelf]);

  const handleCameraChange = (evt: MapCameraChangedEvent) => {
    if (trackSelf) {
      return evt.stop();
    }
    setCamera(evt.detail);
  };

  const handleTrackToggleClick = () => {
    setTrackSelf((prev) => !prev);
  };

  const Icon = trackSelf ? LocateFixedIcon : LocateIcon;

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <button
        type="button"
        aria-label="Follow your location if enabled, otherwise the center of Indianapolis"
        className={cn(
          "z-10 cursor-pointer fixed bottom-20 right-4 p-2 rounded-[50%] text-white",
          trackSelf
            ? "bg-blue-800 hover:bg-blue-900"
            : "bg-blue-400 hover:bg-blue-500",
        )}
        onClick={handleTrackToggleClick}
      >
        <Icon size={32} />
      </button>
      <ReactGoogleMap
        {...camera}
        mapTypeControl={false}
        streetViewControl={false}
        mapId="THE_ONLY_MAP"
        reuseMaps
        gestureHandling="greedy"
        // colorScheme="FOLLOW_SYSTEM"
        zoomControl
        zoomControlOptions={{
          // top left
          position: ControlPosition.INLINE_START_BLOCK_START,
        }}
        onCameraChanged={handleCameraChange}
        cameraControlOptions={{
          // bottom left
          position: ControlPosition.INLINE_START_BLOCK_END,
        }}
      >
        {geolocation.isDefault ? null : (
          <AdvancedMarker position={geolocation.current} title="Your location">
            <Pin
              background="red"
              glyphColor="white"
              borderColor="black"
              scale={0.8}
            />
            {/* <div className="w-4 h-4 absolute top-0 left-0 bg-blue-500 border-2 border-white rounded-[50%] transform-[translate(-50%,-50%)]" /> */}
          </AdvancedMarker>
        )}
      </ReactGoogleMap>
    </APIProvider>
  );
};
