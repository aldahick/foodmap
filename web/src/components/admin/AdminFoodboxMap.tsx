import { APIProvider, Map as ReactGoogleMap } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { Button } from "rsc-daisyui";
import { config } from "../../config";
import { IFoodbox } from "../../sdk/graphql.types";
import { FoodboxMarker } from "../FoodboxMarker";

interface AdminFoodboxMapProps {
  foodboxes: IFoodbox[];
  onEdit: (foodbox: IFoodbox) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export const AdminFoodboxMap: React.FC<AdminFoodboxMapProps> = ({
  foodboxes,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const [camera] = useState({
    center: { lat: 39.768402, lng: -86.158066 }, // Indianapolis
    zoom: 11,
  });

  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={onCreate}>Add Foodbox</Button>
      </div>
      <APIProvider apiKey={config.googleMapsApiKey}>
        <ReactGoogleMap
          {...camera}
          mapId="ADMIN_FOODBOX_MAP"
          reuseMaps
          gestureHandling="greedy"
        >
          {foodboxes.map((foodbox) => (
            <FoodboxMarker
              key={foodbox.id}
              foodbox={foodbox}
              onEdit={() => onEdit(foodbox)}
              onDelete={() => onDelete(foodbox.id)}
            />
          ))}
        </ReactGoogleMap>
      </APIProvider>
    </div>
  );
};
