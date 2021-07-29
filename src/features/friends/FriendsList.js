import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { selectAllFriends, fetchFriendsByUserId } from "./friendsSlice";
import { selectAllUsers } from "../users/usersSlice";

export const FriendsList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [userId, setUserId] = useState(undefined);
  const [clicked, setClicked] = useState(false);
  const friends = useSelector(selectAllFriends);

  const renderedFriends = friends.map((friend, index) => (
    <li key={index}>{friend.name}</li>
  ));

  const onUserIdChanged = (e) => setUserId(e.target.value);
  const searchClicked = () => setClicked(true);

  const onSearchFriendClicked = async () => {
    if (userId) {
      try {
        const resultAction = await dispatch(fetchFriendsByUserId(userId));
        unwrapResult(resultAction);
        searchClicked();
      } catch (err) {
        console.error("Failed search Friends: ", err);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Friends</h2>
      <form>
        <label htmlFor="userName">User name:</label>
        <select
          id="postAuthor"
          value={userId}
          defaultValue=""
          onChange={onUserIdChanged}
        >
          <option disabled value="">
            -- select an option --
          </option>
          {usersOptions}
        </select>
        <button
          className="button"
          type="button"
          onClick={onSearchFriendClicked}
          disabled={!userId}
        >
          Search friends
        </button>
      </form>
      {clicked && (
        <div>
          <p>{friends.length} friends in total</p>
          {renderedFriends}
        </div>
      )}
    </section>
  );
};
