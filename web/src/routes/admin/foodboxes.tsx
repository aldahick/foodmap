import { useState } from "react";
import { Button, Card } from "rsc-daisyui";
import { EditFoodbox } from "../../components/admin/EditFoodbox";
import {
  IFoodbox,
  IFoodboxState,
  useDeleteFoodboxMutation,
  useGetFoodboxesQuery,
} from "../../sdk/graphql.types";

export const AdminFoodboxesRoute: React.FC = () => {
  const [editingFoodbox, setEditingFoodbox] = useState<IFoodbox | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data, loading, error, refetch } = useGetFoodboxesQuery();
  const [deleteFoodbox] = useDeleteFoodboxMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this foodbox?")) {
      await deleteFoodbox({ variables: { id } });
      refetch();
    }
  };

  const handleEdit = (foodbox: IFoodbox) => {
    setEditingFoodbox(foodbox);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingFoodbox(null);
    setIsCreating(true);
  };

  const handleClose = () => {
    setEditingFoodbox(null);
    setIsCreating(false);
    refetch();
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Foodboxes</h1>
        <Button onClick={handleCreate}>Add Foodbox</Button>
      </div>

      <div className="grid gap-4">
        {data?.foodboxes.map((foodbox: IFoodbox) => (
          <Card key={foodbox.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{foodbox.name}</h3>
                <p className="text-sm text-gray-600">
                  Location: {foodbox.position.lat.toFixed(6)},{" "}
                  {foodbox.position.lng.toFixed(6)}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-medium">
                    {getStateLabel(foodbox.state)}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => handleEdit(foodbox)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="secondary"
                  onClick={() => handleDelete(foodbox.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {(editingFoodbox || isCreating) && (
        <EditFoodbox foodbox={editingFoodbox} onClose={handleClose} />
      )}
    </div>
  );
};
