import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  MapCameraChangedEvent,
  MapMouseEvent,
  Pin,
  Map as ReactGoogleMap,
} from "@vis.gl/react-google-maps";
import { LocateFixedIcon, LocateIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { DEFAULT_POSITION, useGeolocation } from "../../hooks/useGeolocation";
import { cn } from "../../util/style";

interface GoogleMapProps {
  mapId: string;
  markers?: {
    id: string;
    position: { lat: number; lng: number };
    color?: string;
    title?: string;
  }[];
  onClick?: (e: MapMouseEvent) => void;
  showLocationButton?: boolean;
  showZoomControl?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  onClick,
  markers,
  showLocationButton = true,
  showZoomControl = true,
  mapId,
  className,
  children,
}) => {
  const geolocation = useGeolocation();
  const [trackSelf, setTrackSelf] = useState(false);
  const [camera, setCamera] = useState({
    center: DEFAULT_POSITION || geolocation.current,
    zoom: 10,
  });

  useEffect(() => {
    if (trackSelf && showLocationButton) {
      setCamera((prev) => ({ ...prev, center: geolocation.current }));
    }
  }, [geolocation.current, trackSelf, showLocationButton]);

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
      {showLocationButton && (
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
      )}
      <ReactGoogleMap
        {...camera}
        mapTypeControl={false}
        streetViewControl={false}
        mapId={mapId}
        reuseMaps
        className={className}
        gestureHandling="greedy"
        // colorScheme="FOLLOW_SYSTEM"
        zoomControl={showZoomControl}
        zoomControlOptions={{
          // top left
          position: ControlPosition.INLINE_START_BLOCK_START,
        }}
        onCameraChanged={handleCameraChange}
        onClick={onClick}
        cameraControlOptions={{
          // bottom left
          position: ControlPosition.INLINE_START_BLOCK_END,
        }}
      >
        {showLocationButton && !geolocation.isDefault && (
          <AdvancedMarker position={geolocation.current} title="Your location">
            <Pin
              background="red"
              glyphColor="white"
              borderColor="black"
              scale={0.8}
            />
          </AdvancedMarker>
        )}
        {children ||
          markers?.map((marker) => (
            <AdvancedMarker
              key={marker.id}
              position={marker.position}
              title={marker.title}
            >
              <Pin
                background={marker.color || "#ef4444"}
                glyphColor="white"
                borderColor="black"
              />
            </AdvancedMarker>
          ))}
      </ReactGoogleMap>
    </APIProvider>
  );
};
