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

    if (!userProfile) {
      return res.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: "User not found",
      });
    }

    const nonPersonalUserInfo = await getUserOrDefault(app.db.users, userProfile.id);

    const user = mergeUserInfo(nonPersonalUserInfo, userProfile);

    return res.send(user);
  });
}
