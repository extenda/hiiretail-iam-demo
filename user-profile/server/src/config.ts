import { BaseConfig } from "env-var-base";

export class AppConfig extends BaseConfig {
  readonly port = this.get("PORT").default(3000).asPortNumber();
  readonly tenantId = this.get("TENANT_ID").required().asString();
  readonly systemId = this.get("SYSTEM_ID").required().asString();
  readonly authToken = this.get("AUTH_TOKEN").required().asString();
}
