import { Router } from "express";
import { App } from "../app";
import { bulkUserProfileSearch } from "../user-profiles/user-profiles-api";
import { mergeUserInfo } from "../utils/merge-user-info";
import { zip } from "../utils/zip-arrays";

const sortById = (a: { id: string }, b: { id: string }) =>
  a.id === b.id ? 0 : a.id > b.id ? 1 : -1;

export function getUsersInGroupEndpoint(app: App): Router {
  return Router().get("/groups/:groupId/users", async (req, res) => {
    const groupId = req.params.groupId;

    const nonPersonalUsersInfo = await app.db.users
      .findMany((user) => user.groupIds.includes(groupId))
      .then((res) => res.sort(sortById));

    const personalUsersInfo = await bulkUserProfileSearch(
      app,
      nonPersonalUsersInfo.map((info) => info.id)
    ).then((res) => res.sort(sortById));

    const users = zip(nonPersonalUsersInfo, personalUsersInfo).map(([nonPersonal, personal]) =>
      mergeUserInfo(nonPersonal, personal)
    );

    return res.send({ users });
  });
}
