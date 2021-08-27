import axios from "axios";
import { AppConfig } from "./config";
import { Database } from "./db/db";
import { BulkSearchApi, Configuration, UsersApi } from "./user-profiles/ups-client";

export class App {
  readonly config = new AppConfig();
  readonly db = new Database();

  readonly axiosInstance = axios.create({ validateStatus: () => true });
  readonly profilesApiConfig = new Configuration({
    basePath: "https://user-profiles.retailsvc.dev",
    accessToken: this.config.authToken,
  });
  readonly profilesApi = new UsersApi(this.profilesApiConfig, undefined, this.axiosInstance);
  readonly profilesBulkSearchApi = new BulkSearchApi(
    this.profilesApiConfig,
    undefined,
    this.axiosInstance
  );
}
