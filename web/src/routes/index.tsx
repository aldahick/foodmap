import type React from "react";
import { GoogleMap } from "../components/GoogleMap";
import { NavigateLayout } from "../components/navigate/NavigateLayout";

export const IndexRoute: React.FC = () => {
  return (
    <NavigateLayout title="Map">
      <GoogleMap />
    </NavigateLayout>
  );
};
