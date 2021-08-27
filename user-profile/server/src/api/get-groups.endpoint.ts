import { Router } from "express";
import { App } from "../app";

export function getGroupsEndpoint(app: App): Router {
  return Router().get("/groups", async (_req, res) => {
    const groups = await app.db.groups.getAll();

    return res.send({ groups });
  });
}
