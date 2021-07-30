import store from "../../app/store";
import { fetchCartsStats } from "./chartsSlice";
import { client } from "./../../api/client";

describe("Fetch all connections", () => {
  it("Correct friends fecth", async () => {
    const stats = [
      {
        id: 1,
        name: "Bob",
        friends: 2,
      },
      {
        id: 2,
        name: "Ashley",
        friends: 2,
      },
      {
        id: 3,
        name: "Steve",
        friends: 0,
      },
    ];
    const clientSpy = jest
      .spyOn(client, "get")
      .mockResolvedValueOnce(stats);
    await store.dispatch(fetchCartsStats());
    expect(clientSpy).toBeCalledWith(
      "http://localhost:3000/users/get/stats"
    );
    let state = store.getState().charts;
    expect(state.ids.length).toEqual(stats.length);
    stats.forEach((connection) => {
      expect(connection).toEqual(state.entities[connection.id]);
    });
  });
});
