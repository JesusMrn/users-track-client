import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import { addNewConnection } from "./connectionsSlice";

export const AddConnectionsForm = () => {
  const [userName, setUserName] = useState("");
  const [userFriendWithName, setUserFriendWithName] = useState("");
  const [isMutual, setMutual] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const onUserNameChanged = (e) => setUserName(e.target.value);
  const onMutualChanged = (e) => setMutual(e.target.value);
  const onUserFriendWithNameChanged = (e) =>
    setUserFriendWithName(e.target.value);

  const canAdd = [userName, userFriendWithName].every(Boolean);

  const onAddConnectionClicked = async () => {
    if (canAdd) {
      try {
        const resultAction = await dispatch(
          addNewConnection({
            id: 1,
            user: userName,
            userFriendWith: userFriendWithName,
            isMutual: isMutual ? 1 : 0,
          })
        );
        unwrapResult(resultAction);
        setUserName("");
        setUserFriendWithName("");
        setMutual(false);
        setErrorMessage("");
      } catch (err) {
        console.error("Failed add Connection: ", err);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Connection</h2>
      <form>
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userNAme"
          name="userName"
          value={userName}
          onChange={onUserNameChanged}
        />
        <label htmlFor="userFriendWithName">User wich is friend with:</label>
        <input
          type="text"
          id="userFriendWithName"
          name="userFriendWithName"
          value={userFriendWithName}
          onChange={onUserFriendWithNameChanged}
        />
        <div className="toggle">
          <label htmlFor="isMutual">It's mutual?</label>
          <Toggle
            id="isMutual"
            defaultChecked={false}
            onChange={onMutualChanged}
          />
        </div>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <button
          className="button"
          type="button"
          onClick={onAddConnectionClicked}
          disabled={!canAdd}
        >
          Add Connection
        </button>
      </form>
    </section>
  );
};
