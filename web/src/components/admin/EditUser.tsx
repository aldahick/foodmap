import { useApolloClient } from "@apollo/client";
import { SaveIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { sortBy } from "remeda";
import { Button, Card, Checkbox, Input, Label } from "rsc-daisyui";
import {
  IPermission,
  IUser,
  useDeleteUserMutation,
  useUpsertUserMutation,
} from "../../sdk/graphql.types";

const permissionLabels: Record<IPermission, string> = {
  [IPermission.All]: "All",
  [IPermission.Foodboxes]: "Manage Foodboxes",
  [IPermission.Users]: "Manage Users",
};

export const EditUser: React.FC<{ user?: IUser }> = ({ user }) => {
  const client = useApolloClient();
  const [deleteUser] = useDeleteUserMutation();
  const [upsertUser] = useUpsertUserMutation();
  const [deleting, setDeleting] = useState(false);
  const [fields, setFields] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    permissions: user?.permissions ?? [],
  });

  const handleSave = () => {
    upsertUser({
      variables: {
        params: {
          id: user?.id,
          ...fields,
        },
      },
    }).then(async () => {
      toast(`Saved ${fields.name}`, { type: "info" });
      await client.refetchQueries({ include: ["getUsers"] });
    });
  };

  const handleDelete = () => {
    if (!user) {
      return;
    }
    deleteUser({
      variables: {
        id: user.id,
      },
    }).then(async () => {
      toast(`Deleted ${user.name}`, { type: "info" });
      await client.refetchQueries({ include: ["getUsers"] });
    });
  };

  const handleDeleteClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (deleting) {
      handleDelete();
    } else {
      setDeleting(true);
    }
    return false;
  };

  const handleFieldChange =
    (key: keyof typeof fields) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: evt.target.value }));
    };

  const handlePermissionChange =
    (permission: IPermission) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => {
        let newPermissions = evt.target.checked
          ? prev.permissions.concat([permission])
          : prev.permissions.filter((p) => p !== permission);
        if (newPermissions.includes(IPermission.All)) {
          newPermissions = [IPermission.All];
        }
        return { ...prev, permissions: newPermissions };
      });
    };

  const handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      handleSave();
    }
  };

  const hasAll = fields.permissions.includes(IPermission.All);

  return (
    <Card className="space-y-2 p-4 border border-gray-300 shadow">
      <div className="flex items-center gap-2">
        <span className="w-10 font-medium">Name</span>
        <Input
          placeholder="Name"
          value={fields.name}
          onChange={handleFieldChange("name")}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-10 font-medium">Email</span>
        <Input
          placeholder="Email"
          value={fields.email}
          onChange={handleFieldChange("email")}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div>
        <div className="flex">
          <div className="grow space-y-1">
            <div className="font-medium">Permissions</div>
            {sortBy(Object.entries(permissionLabels), ([, label]) => label).map(
              ([permission, label]) => (
                <div key={permission} className="flex items-center gap-2">
                  <Checkbox
                    type="switch"
                    disabled={hasAll && permission !== IPermission.All}
                    checked={
                      hasAll ||
                      fields.permissions.includes(permission as IPermission)
                    }
                    onChange={handlePermissionChange(permission as IPermission)}
                  />
                  <Label>{label}</Label>
                </div>
              ),
            )}
          </div>
          <div className="flex justify-end space-x-2">
            {user && (
              <Button
                color={deleting ? "error" : "secondary"}
                onClick={handleDeleteClick}
              >
                {deleting ? "Are you sure?" : "Delete user"}
              </Button>
            )}
            <Button color="primary" onClick={handleSave}>
              <SaveIcon />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
