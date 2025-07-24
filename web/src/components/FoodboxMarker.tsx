import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Button } from "rsc-daisyui";
import { IFoodbox, IFoodboxState } from "../sdk/graphql.types";

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

export const FoodboxMarker: React.FC<{
  foodbox: IFoodbox;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ foodbox, onEdit, onDelete }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfo, setShowInfo] = useState(false);

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
        <InfoWindow anchor={marker} onCloseClick={() => setShowInfo(false)}>
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
