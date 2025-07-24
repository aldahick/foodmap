import type React from "react";
import { FoodboxMarker } from "../components/FoodboxMarker";
import { GoogleMap } from "../components/map/GoogleMap";
import { NavigateLayout } from "../components/navigate/NavigateLayout";
import { useGetFoodboxesQuery } from "../sdk/graphql.types";

export const IndexRoute: React.FC = () => {
  const {
    data: { foodboxes } = {},
  } = useGetFoodboxesQuery();

  return (
    <NavigateLayout title="Map">
      <GoogleMap mapId="VIEW">
        {foodboxes?.map((foodbox) => (
          <FoodboxMarker showActions key={foodbox.id} foodbox={foodbox} />
        ))}
      </GoogleMap>
    </NavigateLayout>
  );
};
