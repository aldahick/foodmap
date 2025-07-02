import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as ReactGoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { Button } from "rsc-daisyui";
import { config } from "../../config";
import { IFoodbox, IFoodboxState } from "../../sdk/graphql.types";

interface AdminFoodboxMapProps {
  foodboxes: IFoodbox[];
  onEdit: (foodbox: IFoodbox) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const FoodboxMarker: React.FC<{
  foodbox: IFoodbox;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ foodbox, onEdit, onDelete }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfo, setShowInfo] = useState(false);

  const getPinColor = (state: IFoodboxState) => {
    switch (state) {
      case IFoodboxState.Full:
        return "#22c55e"; // green
      case IFoodboxState.ReportedEmpty:
        return "#f97316"; // orange
      case IFoodboxState.ConfirmedEmpty:
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const getStateLabel = (state: IFoodboxState) => {
    switch (state) {
      case IFoodboxState.Full:
        return "Full";
      case IFoodboxState.ReportedEmpty:
        return "Reported Empty";
      case IFoodboxState.ConfirmedEmpty:
        return "Confirmed Empty";
      default:
        return state;
    }
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={foodbox.position}
        onClick={() => setShowInfo(true)}
      >
        <Pin
          background={getPinColor(foodbox.state)}
          glyphColor="white"
          borderColor="black"
        />
      </AdvancedMarker>
      {showInfo && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="p-2 min-w-[200px]">
            <h3 className="font-semibold text-lg">{foodbox.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Status: {getStateLabel(foodbox.state)}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="primary"
                onClick={() => {
                  onEdit();
                  setShowInfo(false);
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="secondary"
                onClick={() => {
                  onDelete();
                  setShowInfo(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

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
