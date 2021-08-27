import { BaseConfig } from "env-var-base";

export class AppConfig extends BaseConfig {
  readonly port = this.get("PORT").default(3000).asPortNumber();
  readonly authToken = this.get("AUTH_TOKEN").required().asString();
}
