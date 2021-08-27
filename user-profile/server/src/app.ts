import { AppConfig } from "./config";
import { Database } from "./db/db";
import { BulkSearchApi, Configuration, UsersApi } from "./user-profiles/ups-client";

export class App {
  readonly config = new AppConfig();
  readonly db = new Database();
  readonly profilesApi = new UsersApi(
    new Configuration({
      basePath: "https://user-profiles.retailsvc.dev",
      accessToken: this.config.authToken,
    })
  );
  readonly profilesBulkSearchApi = new BulkSearchApi(
    new Configuration({
      basePath: "https://user-profiles.retailsvc.dev",
      accessToken: this.config.authToken,
    })
  );
}
