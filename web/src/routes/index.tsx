import { useQuery } from "@apollo/client/react";
import type React from "react";
import { FoodboxMarker } from "../components/FoodboxMarker";
import { GoogleMap } from "../components/map/GoogleMap";
import { NavigateLayout } from "../components/navigate/NavigateLayout";
import { GetFoodboxesDocument } from "../sdk/gql/graphql";

export const IndexRoute: React.FC = () => {
  const { data: { foodboxes } = {} } = useQuery(GetFoodboxesDocument);

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
