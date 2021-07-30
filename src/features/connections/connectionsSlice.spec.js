import store from "../../app/store";
import { addNewConnection, fetchConnections } from "./connectionsSlice";
import { client } from "./../../api/client";

describe("Add a new connection", () => {
  it("Correct new connection", async () => {
    const newConnection = {
      id: "1",
      user: "Jose",
      userFriendWith: "Steve",
      isMutual: 1,
    };
    const clientSpy = jest
      .spyOn(client, "post")
      .mockResolvedValueOnce(newConnection);
    await store.dispatch(addNewConnection(newConnection));
    expect(clientSpy).toBeCalledWith(
      "http://localhost:3000/connections",
      newConnection
    );
    let state = store.getState().connections;
    expect(state.entities[state.ids.length]).toEqual(newConnection);
  });
});

describe("Fetch all connections", () => {
  it("Correct connections fecth", async () => {
    const listConnections = [
      {
        id: 1,
        user: "Bob",
        userFriendWith: "Ashley",
        isMutual: 1,
      },
      {
        id: 2,
        user: "Bob",
        userFriendWith: "Steve",
        isMutual: 0,
      },
      {
        id: 3,
        user: "Ashley",
        userFriendWith: "Steve",
        isMutual: 1,
      },
    ];
    const clientSpy = jest
      .spyOn(client, "get")
      .mockResolvedValueOnce(listConnections);
    await store.dispatch(fetchConnections());
    expect(clientSpy).toBeCalledWith("http://localhost:3000/connections");
    let state = store.getState().connections;
    expect(state.ids.length).toEqual(listConnections.length);
    listConnections.forEach((connection) => {
      expect(connection).toEqual(state.entities[connection.id]);
    });
  });
});
