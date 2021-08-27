import { App } from "../app";
import { BulkSearchDto } from "./ups-client";

const TENANT_ID = "2p0U2ogYnEFJCyywcnI8"; // testrunner staging
const SYSTEM_ID = "ups-demo";

export type UserProfile = {
  id: string;
  sharedAttributes: {
    displayName: string;
  };
};

export async function getUserProfile(app: App, userId: string): Promise<UserProfile | undefined> {
  const res = await app.profilesApi.getUser(TENANT_ID, SYSTEM_ID, userId);

  if (res.status === 404) {
    return undefined;
  }

  if (res.status !== 200) {
    throw new Error("Unknown error");
  }

  return res.data;
}

export async function findUserProfile(
  app: App,
  query: { name?: string; email?: string }
): Promise<UserProfile | undefined> {
  const filter = JSON.stringify({
    sharedAttributes: {
      displayName: query.name,
      emails: [{ value: query.email }],
    },
  });

  const res = await app.profilesApi.findUser(TENANT_ID, SYSTEM_ID, filter);

  if (res.status === 404) {
    return undefined;
  }

  if (res.status !== 200) {
    throw new Error("Unknown error");
  }

  return res.data;
}

export async function bulkUserProfileSearch(app: App, userIds: string[]): Promise<UserProfile[]> {
  const query: BulkSearchDto = {
    ids: userIds,
    select: ["sharedAttributes.displayName"],
  };

  const res = await app.profilesBulkSearchApi.findUsers(TENANT_ID, SYSTEM_ID, query);

  if (res.status !== 200) {
    throw new Error("Unknown error");
  }

  if (res.data.length !== userIds.length) {
    throw new Error("Some users were not found");
  }

  return res.data as UserProfile[];
}
