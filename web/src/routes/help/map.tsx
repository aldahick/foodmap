import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "rsc-daisyui";
import { HelpLayout } from "../../components/HelpLayout";
import greenMarkerIconUrl from "../../images/icons/green-marker.png";
import orangeMarkerIconUrl from "../../images/icons/orange-marker.png";
import redMarkerIconUrl from "../../images/icons/red-marker.png";

const STEPS = [
  () => (
    <>
      <div className="font-medium text-center">
        The map shows the location and current status of CFBP food boxes on the
        map using markers:
      </div>
      <div className="flex flex-col items-center">
        <img src={greenMarkerIconUrl} alt="Green marker icon" width="20px" />
        means there is food ready at that location
      </div>
      <div className="flex flex-col items-center">
        <img src={orangeMarkerIconUrl} alt="Orange marker icon" width="20px" />
        means that location was reported empty by someone else
      </div>
      <div className="flex flex-col items-center">
        <img src={redMarkerIconUrl} alt="Red marker icon" width="20px" />
        means there is no food at that location
      </div>
    </>
  ),
  () => (
    <>
      <div className="font-medium text-center">
        Click on a marker to open info about that food box:
      </div>
      {/* TODO finish */}
    </>
  ),
  () => (
    <>
      <div className="font-medium text-center">
        You can zoom to your current location:
      </div>
      {/* TODO finish */}
    </>
  ),
  () => (
    <>
      <div className="font-medium text-center">
        Automatically get directions to the nearest food box:
      </div>
      {/* TODO finish */}
    </>
  ),
];

export const MapHelpRoute: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  const atFirstStep = stepIndex === 0;
  const atLastStep = stepIndex === STEPS.length - 1;

  const handlePreviousClick = () => {
    if (atFirstStep) {
      navigate("/help");
    } else {
      setStepIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNextClick = () => {
    if (atLastStep) {
      navigate("/help");
    } else {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const Step = STEPS[stepIndex];
  if (!Step) {
    return null;
  }

  return (
    <HelpLayout title="Map Tutorial">
      <div className="h-[calc(100vh-112px)]">
        <div className="flex flex-col items-center text-sm gap-4 px-2 pt-4">
          <Step />
        </div>
      </div>
      <div className="flex justify-around pb-4">
        <Button color="neutral" onClick={handlePreviousClick}>
          {atFirstStep ? "Back" : "Previous"}
        </Button>
        <Button color="primary" onClick={handleNextClick}>
          {atLastStep ? "Finish" : "Continue"}
        </Button>
      </div>
    </HelpLayout>
  );
};
