import { NonPersonalUserInfo } from "./non-personal-user-info";

export type User = NonPersonalUserInfo & {
  id: string;
  name: string;
};
