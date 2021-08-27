import { Router } from "express";
import { App } from "../app";
import { findUserProfile } from "../user-profiles/user-profiles-api";
import { getUserOrDefault } from "../utils/get-user-or-default";
import { mergeUserInfo } from "../utils/merge-user-info";

export function findUserEndpoint(app: App): Router {
  // after escaping colon it becomes /users:find
  return Router().get("/users[:]find", async (req, res) => {
    const { name, email } = req.query;

    const userProfile = await findUserProfile(app, {
      name: name as string,
      email: email as string,
    });

    const nonPersonalUserInfo = await getUserOrDefault(app.db.users, userProfile.id);

    const user = mergeUserInfo(nonPersonalUserInfo, userProfile);

    return res.send(user);
  });
}
