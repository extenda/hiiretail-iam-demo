import express from "express";
import "express-async-errors";
import cors from "cors";

import { App } from "./app";
import { seedDatabase } from "./db/seed";
import { getUserByIdEndpoint } from "./api/get-user-by-id.endpoint";
import { getGroupsEndpoint } from "./api/get-groups.endpoint";
import { getUsersInGroupEndpoint } from "./api/get-users-in-group.endpoint";
import { findUserEndpoint } from "./api/find-user.endpoint";
import { errorHandlerMiddleware } from "./utils/error-handler.middleware";

const app = new App();

seedDatabase(app.db);

express()
  .use(cors())
  .use(getGroupsEndpoint(app))
  .use(getUsersInGroupEndpoint(app))
  .use(getUserByIdEndpoint(app))
  .use(findUserEndpoint(app))
  .use(errorHandlerMiddleware)
  .listen(app.config.port, () => {
    console.log(`Server is running on port ${app.config.port}`);
  });
