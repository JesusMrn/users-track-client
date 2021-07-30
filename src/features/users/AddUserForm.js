import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { addNewUser } from "./usersSlice";

export const AddUserForm = () => {
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const onUserNameChanged = (e) => setUserName(e.target.value);

  const canAdd = userName;

  const onAddUserClicked = async () => {
    if (canAdd) {
      try {
        const resultAction = await dispatch(
          addNewUser({ id: 1, name: userName })
        );
        unwrapResult(resultAction);
        setUserName("");
        setErrorMessage("");
      } catch (err) {
        console.error("Failed add User: ", err);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <section>
      <h2>Add a New User</h2>
      <form>
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userNAme"
          name="userName"
          value={userName}
          onChange={onUserNameChanged}
        />
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <button
          className="button"
          type="button"
          onClick={onAddUserClicked}
          disabled={!canAdd}
        >
          Add User
        </button>
      </form>
    </section>
  );
};
