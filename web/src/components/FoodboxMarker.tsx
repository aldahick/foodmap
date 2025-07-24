import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Button } from "rsc-daisyui";
import { IFoodbox, IFoodboxState } from "../sdk/graphql.types";

const pinColor: Record<IFoodboxState, string> = {
  [IFoodboxState.Full]: "#22c55e", // green
  [IFoodboxState.ReportedEmpty]: "#f97316", // orange
  [IFoodboxState.ConfirmedEmpty]: "#ef4444", // red
};

const stateLabel: Record<IFoodboxState, string> = {
  [IFoodboxState.Full]: "Full",
  [IFoodboxState.ReportedEmpty]: "Reported Empty",
  [IFoodboxState.ConfirmedEmpty]: "Confirmed Empty",
};

export const FoodboxMarker: React.FC<{
  foodbox: IFoodbox;
  showActions: boolean;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ foodbox, onEdit, onDelete }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfo, setShowInfo] = useState(false);

  const handleEditClick = () => {
    onEdit();
    setShowInfo(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setShowInfo(false);
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={foodbox.position}
        onClick={() => setShowInfo(true)}
      >
        <Pin
          background={pinColor[foodbox.state] ?? "#6b7280"}
          glyphColor="white"
          borderColor="black"
        />
      </AdvancedMarker>
      {showInfo && (
        <InfoWindow
          headerContent={
            <h3 className="font-semibold text-lg -mt-2">{foodbox.name}</h3>
          }
          anchor={marker}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="pb-2 min-w-[200px]">
            <p className="text-sm text-gray-600 mb-2">
              Status: {stateLabel[foodbox.state] ?? foodbox.state}
            </p>
            <div className="flex gap-2">
              <Button size="sm" color="primary" onClick={handleEditClick}>
                Edit
              </Button>
              <Button size="sm" color="secondary" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
