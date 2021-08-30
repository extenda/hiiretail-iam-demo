import { Router } from "express";
import { App } from "../app";

export function addUserToGroupEndpoint(app: App): Router {
  return Router().put("/groups/:groupId/users/:userId", async (req, res) => {
    const { groupId, userId } = req.params;

    const user = await app.db.users.getById(userId);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: "User not found",
      });
    }

    const group = await app.db.groups.getById(groupId);

    if (!group) {
      return res.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: "Group not found",
      });
    }

    await app.db.users.save({
      ...user,
      groupIds: [...new Set([...user.groupIds, groupId])],
    });

    return res.status(200).send();
  });
}
