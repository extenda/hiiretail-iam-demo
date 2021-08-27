import { NonPersonalUserInfo } from "../types/non-personal-user-info";
import { User } from "../types/user";
import { UserProfile } from "../user-profiles/user-profiles-api";

export function mergeUserInfo(
  nonPersonalUserInfo: NonPersonalUserInfo,
  userProfile: UserProfile
): User {
  return {
    ...nonPersonalUserInfo,
    name: userProfile.sharedAttributes.displayName,
  };
}
