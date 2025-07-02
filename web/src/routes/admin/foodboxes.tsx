import { useState } from "react";
import { AdminFoodboxMap } from "../../components/admin/AdminFoodboxMap";
import { EditFoodbox } from "../../components/admin/EditFoodbox";
import {
  IFoodbox,
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Manage Foodboxes</h1>
      </div>
      
      <div className="flex-1">
        <AdminFoodboxMap
          foodboxes={data?.foodboxes || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      </div>

      {(editingFoodbox || isCreating) && (
        <EditFoodbox foodbox={editingFoodbox} onClose={handleClose} />
      )}
    </div>
  );
};
