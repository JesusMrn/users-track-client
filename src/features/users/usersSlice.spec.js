import store from "../../app/store";
import { fetchUsers, addNewUser } from "./usersSlice";
import { client } from "./../../api/client";

describe("Add a new user", () => {
  it("Correct new user", async () => {
    const newUser = { id: "1", name: "Jose" };
    const clientSpy = jest.spyOn(client, "post").mockResolvedValueOnce(newUser);
    await store.dispatch(addNewUser(newUser));
    expect(clientSpy).toBeCalledWith("http://localhost:3000/users", newUser);
    let state = store.getState().users;
    expect(state.entities[state.ids.length]).toEqual(newUser);
  });
});

describe("Fetch all user", () => {
  it("Correct fecth", async () => {
    const listUsers = [
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
      .mockResolvedValueOnce(listUsers);
    await store.dispatch(fetchUsers());
    expect(clientSpy).toBeCalledWith("http://localhost:3000/users");
    let state = store.getState().users;
    expect(state.ids.length).toEqual(listUsers.length);
    listUsers.forEach((user) => {
      expect(user).toEqual(state.entities[user.id]);
    });
  });
});
