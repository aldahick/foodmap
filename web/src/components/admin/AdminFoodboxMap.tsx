import React from "react";
import { Button } from "rsc-daisyui";
import { Foodbox } from "../../sdk/gql/graphql";
import { FoodboxMarker } from "../FoodboxMarker";
import { GoogleMap } from "../map/GoogleMap";

interface AdminFoodboxMapProps {
  foodboxes: Foodbox[];
  onEdit: (foodbox: Foodbox) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export const AdminFoodboxMap: React.FC<AdminFoodboxMapProps> = ({
  foodboxes,
  onEdit,
  onDelete,
  onCreate,
}) => {
  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={onCreate}>Add Foodbox</Button>
      </div>
      <GoogleMap mapId="ADMIN_FOODBOX_MAP">
        {foodboxes.map((foodbox) => (
          <FoodboxMarker
            showActions
            key={foodbox.id}
            foodbox={foodbox}
            onEdit={() => onEdit(foodbox)}
            onDelete={() => onDelete(foodbox.id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
