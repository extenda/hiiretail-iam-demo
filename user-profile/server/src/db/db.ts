import { Group } from "../types/group";
import { NonPersonalUserInfo } from "../types/non-personal-user-info";
import { Collection } from "./collection";

export class Database {
  readonly users = new Collection<NonPersonalUserInfo>();
  readonly groups = new Collection<Group>();
}
