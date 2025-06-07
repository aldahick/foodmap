import React from "react";
import { sortBy } from "remeda";
import { Loading } from "rsc-daisyui";
import { EditUser } from "../../components/admin/EditUser";
import { useGetUsersQuery } from "../../sdk/graphql.types";

export const AdminUsersRoute: React.FC = () => {
  const { data, loading } = useGetUsersQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 p-2">
      <div className="font-bold text-2xl">Manage Users</div>
      {data &&
        sortBy(data.users, (u) => u.name).map((user) => (
          <EditUser key={user.id} user={user} />
        ))}
      <EditUser />
    </div>
  );
};
