import { Collection } from "../db/collection";
import { NonPersonalUserInfo } from "../types/non-personal-user-info";

export async function getUserOrDefault(
  users: Collection<NonPersonalUserInfo>,
  userId: string
): Promise<NonPersonalUserInfo> {
  return (
    (await users.getById(userId)) ||
    (await users.save({
      id: userId,
      groupIds: [],
    }))
  );
}
