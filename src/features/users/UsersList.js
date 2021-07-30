import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "./usersSlice";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => <li key={user.id}>{user.name}</li>);

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
