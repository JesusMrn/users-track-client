import store from "../../app/store";
import { fetchFriendsByUserId } from "./friendsSlice";
import { client } from "./../../api/client";

describe("Fetch all connections", () => {
  it("Correct friends fecth", async () => {
    const listFriends = [
      {
        id: 1,
        name: "Bob",
      },
      {
        id: 2,
        name: "Ashley",
      },
      {
        id: 3,
        name: "Steve",
      },
    ];
    const clientSpy = jest
      .spyOn(client, "get")
      .mockResolvedValueOnce(listFriends);
    await store.dispatch(fetchFriendsByUserId(4));
    expect(clientSpy).toBeCalledWith(
      "http://localhost:3000/users/4/connections"
    );
    let state = store.getState().friends;
    expect(state.ids.length).toEqual(listFriends.length);
    listFriends.forEach((connection) => {
      expect(connection).toEqual(state.entities[connection.id]);
    });
  });
});
