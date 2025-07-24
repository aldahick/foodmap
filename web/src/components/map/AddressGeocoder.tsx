import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Button, Input } from "rsc-daisyui";

/**
 * Renders an input for the user to search an address.
 * Returns a lat/lng pair via onLocationSelect
 */
export const AddressGeocoder: React.FC<{
  onLocationSelect: (position: google.maps.LatLngLiteral) => void;
  initialAddress?: string;
}> = ({ onLocationSelect, initialAddress = "" }) => {
  const geocodingLib = useMapsLibrary("geocoding");
  const [address, setAddress] = useState(initialAddress);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleGeocode = async () => {
    if (!(geocodingLib && address.trim())) {
      return;
    }

    setIsGeocoding(true);
    try {
      const geocoder = new geocodingLib.Geocoder();
      const result = await geocoder.geocode({ address });

      if (result.results && result.results.length > 0) {
        const location = result.results[0]?.geometry.location;
        if (location) {
          onLocationSelect({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGeocode();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="Enter an address"
        className="flex-1"
      />
      <Button
        type="button"
        onClick={handleGeocode}
        disabled={isGeocoding || !address.trim()}
        size="sm"
      >
        {isGeocoding ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};
