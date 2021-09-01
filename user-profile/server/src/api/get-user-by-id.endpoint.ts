import { Router } from "express";
import { App } from "../app";
import { getUserProfile } from "../user-profiles/user-profiles-api";
import { getUserOrDefault } from "../utils/get-user-or-default";
import { mergeUserInfo } from "../utils/merge-user-info";

export function getUserByIdEndpoint(app: App): Router {
  return Router().get("/users/:id", async (req, res) => {
    const userId = req.params.id;

    const personalUserInfo = await getUserProfile(app, userId);

    if (!personalUserInfo) {
      return res.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: "User not found",
      });
    }

    const nonPersonalUserInfo = await getUserOrDefault(app.db.users, userId);

    const user = mergeUserInfo(nonPersonalUserInfo, personalUserInfo);

    return res.send(user);
  });
}
