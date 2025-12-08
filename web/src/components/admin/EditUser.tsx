import { useApolloClient, useMutation } from "@apollo/client/react";
import { SaveIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { sortBy } from "remeda";
import { Button, Card, Checkbox, Input, Label } from "rsc-daisyui";
import {
  DeleteUserDocument,
  Permission,
  UpsertUserDocument,
  User,
} from "../../sdk/gql/graphql";

const permissionLabels: Record<Permission, string> = {
  [Permission.All]: "All",
  [Permission.Foodboxes]: "Manage Foodboxes",
  [Permission.Users]: "Manage Users",
};

export const EditUser: React.FC<{ user?: User }> = ({ user }) => {
  const client = useApolloClient();
  const [deleteUser] = useMutation(DeleteUserDocument);
  const [upsertUser] = useMutation(UpsertUserDocument);
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
    (permission: Permission) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => {
        let newPermissions = evt.target.checked
          ? prev.permissions.concat([permission])
          : prev.permissions.filter((p) => p !== permission);
        if (newPermissions.includes(Permission.All)) {
          newPermissions = [Permission.All];
        }
        return { ...prev, permissions: newPermissions };
      });
    };

  const handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      handleSave();
    }
  };

  const hasAll = fields.permissions.includes(Permission.All);

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
                    disabled={hasAll && permission !== Permission.All}
                    checked={
                      hasAll ||
                      fields.permissions.includes(permission as Permission)
                    }
                    onChange={handlePermissionChange(permission as Permission)}
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
