import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllConnections, fetchConnections } from "./connectionsSlice";

export const ConnectionsList = () => {
  const dispatch = useDispatch();
  const connections = useSelector(selectAllConnections);
  const connectionStatus = useSelector((state) => state.connections.status);
  const error = useSelector((state) => state.connections.error);

  const renderedConnections = connections.map((connection, index) => (
    <li key={index}>
      {connection.user} is friend with {connection.userFriendWith}
      {connection.isMutual === 1 ? " and is mutual" : " but it isn't mutual"}
    </li>
  ));

  useEffect(() => {
    if (connectionStatus === "idle") {
      dispatch(fetchConnections());
    }
  }, [connectionStatus, dispatch]);

  let content;

  if (connectionStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (connectionStatus === "succeeded") {
    content = (
      <div>
        <ul>{renderedConnections}</ul>
      </div>
    );
  } else if (connectionStatus === "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Connections</h2>
      {content}
    </section>
  );
};
