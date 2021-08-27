import { Router } from "express";
import { App } from "../app";
import { bulkUserProfileSearch } from "../user-profiles/user-profiles-api";
import { mergeUserInfo } from "../utils/merge-user-info";
import { zip } from "../utils/zip-arrays";

export function getUsersInGroupEndpoint(app: App): Router {
  return Router().get("/groups/:groupId/users", async (req, res) => {
    const groupId = req.params.groupId;

    const nonPersonalUsersInfo = await app.db.users.findMany((user) =>
      user.groupIds.includes(groupId)
    );

    const personalUsersInfo = await bulkUserProfileSearch(
      app,
      nonPersonalUsersInfo.map((info) => info.id)
    );

    const users = zip(nonPersonalUsersInfo, personalUsersInfo).map(([nonPersonal, personal]) =>
      mergeUserInfo(nonPersonal, personal)
    );

    return res.send({ users });
  });
}
