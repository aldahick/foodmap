import { useEffect, useState } from "react";
import { entries } from "remeda";
import { Button, Input, Modal, Select } from "rsc-daisyui";
import {
  IFoodbox,
  IFoodboxInput,
  IFoodboxState,
  useUpsertFoodboxMutation,
} from "../../sdk/graphql.types";

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
    position: { lat: 0, lng: 0 },
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

  const handlePositionChange = (field: "lat" | "lng", value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      position: {
        ...prev.position,
        [field]: numValue,
      },
    }));
  };

  return (
    <Modal open onClose={onClose}>
      <Modal.Box>
        <h3 className="font-bold text-lg">
          {foodbox ? "Edit Foodbox" : "Create Foodbox"}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="foodbox-lat"
                className="block text-sm font-medium mb-1"
              >
                Latitude
              </label>
              <Input
                id="foodbox-lat"
                type="number"
                step="0.000001"
                value={formData.position.lat}
                onChange={(e) => handlePositionChange("lat", e.target.value)}
                placeholder="Latitude"
                required
              />
            </div>
            <div>
              <label
                htmlFor="foodbox-lng"
                className="block text-sm font-medium mb-1"
              >
                Longitude
              </label>
              <Input
                id="foodbox-lng"
                type="number"
                step="0.000001"
                value={formData.position.lng}
                onChange={(e) => handlePositionChange("lng", e.target.value)}
                placeholder="Longitude"
                required
              />
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

          <Modal.Action className="flex justify-end gap-2 pt-4">
            <Button type="button" color="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Action>
        </form>
      </Modal.Box>
    </Modal>
  );
};
