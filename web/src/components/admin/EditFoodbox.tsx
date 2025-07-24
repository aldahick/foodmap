import { APIProvider, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { entries } from "remeda";
import { Button, Input, Modal, Select } from "rsc-daisyui";
import { config } from "../../config";
import { DEFAULT_POSITION } from "../../hooks/useGeolocation";
import {
  IFoodbox,
  IFoodboxInput,
  IFoodboxState,
  useUpsertFoodboxMutation,
} from "../../sdk/graphql.types";
import { AddressGeocoder } from "../map/AddressGeocoder";
import { GoogleMap } from "../map/GoogleMap";

interface EditFoodboxProps {
  foodbox: IFoodbox | null;
  onClose: () => void;
}

export const EditFoodbox: React.FC<EditFoodboxProps> = ({
  foodbox,
  onClose,
}) => {
  const [formData, setFormData] = useState<IFoodboxInput>({
    name: "",
    position: DEFAULT_POSITION, // Default to Indianapolis
    state: IFoodboxState.Full,
  });

  const [upsertFoodbox, { loading }] = useUpsertFoodboxMutation();

  useEffect(() => {
    if (foodbox) {
      setFormData({
        name: foodbox.name,
        position: {
          lat: foodbox.position.lat,
          lng: foodbox.position.lng,
        },
        state: foodbox.state,
      });
    }
  }, [foodbox]);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    console.log(formData, foodbox?.id);

    try {
      await upsertFoodbox({
        variables: {
          id: foodbox?.id,
          input: formData,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error saving foodbox:", error);
    }
  };

  const handleChange = <Key extends keyof IFoodboxInput>(
    field: Key,
    value: IFoodboxInput[Key],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMapClick = (e: MapMouseEvent) => {
    setFormData((prev) => ({
      ...prev,
      position: e.detail.latLng ?? prev.position,
    }));
  };

  const handleLocationSelect = (position: google.maps.LatLngLiteral) => {
    setFormData((prev) => ({
      ...prev,
      position,
    }));
  };

  return (
    <Modal open onClose={onClose}>
      <Modal.Box>
        <h3 className="font-bold text-lg">
          {foodbox ? "Edit " : "Create "}Foodbox
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="foodbox-name"
              className="block text-sm font-medium mb-1"
            >
              Name
            </label>
            <Input
              id="foodbox-name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Foodbox name"
              required
            />
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Location</div>
            <div className="space-y-2">
              <APIProvider apiKey={config.googleMapsApiKey}>
                <AddressGeocoder onLocationSelect={handleLocationSelect} />
              </APIProvider>
              <div className="text-xs text-gray-600">
                Or click on the map to select a location
              </div>
              <div className="h-64 w-full rounded border">
                <GoogleMap
                  mapId="EDIT"
                  onClick={handleMapClick}
                  showLocationButton={false}
                  className="h-full w-full"
                  markers={[
                    {
                      id: "editing",
                      position: formData.position,
                      color: "#ef4444",
                      title: "Foodbox location",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="foodbox-state"
              className="block text-sm font-medium mb-1"
            >
              Status
            </label>
            <Select
              id="foodbox-state"
              value={formData.state}
              onChange={(evt) =>
                handleChange("state", evt.target.value as IFoodboxState)
              }
            >
              {entries(IFoodboxState).map(([label, value]) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="modal-action flex justify-end gap-2 pt-4">
            <Button type="button" color="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal.Box>
    </Modal>
  );
};
