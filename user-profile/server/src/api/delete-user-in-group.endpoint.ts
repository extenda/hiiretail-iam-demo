import { Router } from "express";
import { App } from "../app";

export function deleteUserInGroupEndpoint(app: App): Router {
  return Router().delete("/groups/:groupId/users/:userId", async (req, res) => {
    const { groupId, userId } = req.params;

    const user = await app.db.users.getById(userId);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: "User not found",
      });
    }

    await app.db.users.save({
      ...user,
      groupIds: user.groupIds.filter((id) => id !== groupId),
    });

    return res.status(204).send();
  });
}
