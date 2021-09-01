import { App } from "../app";
import { BulkSearchDto } from "./ups-client";

export type UserProfile = {
  id: string;
  sharedAttributes: {
    displayName: string;
    emails: { type?: string; value: string }[];
  };
};

export async function getUserProfile(app: App, userId: string): Promise<UserProfile | undefined> {
  const res = await app.profilesApi.getUser(app.config.tenantId, app.config.systemId, userId);

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

  const res = await app.profilesApi.findUser(app.config.tenantId, app.config.systemId, filter);

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
    select: ["sharedAttributes.displayName", "sharedAttributes.emails"],
  };

  const res = await app.profilesBulkSearchApi.findUsers(
    app.config.tenantId,
    app.config.systemId,
    query
  );

  if (res.status !== 200) {
    throw new Error("Unknown error");
  }

  if (res.data.length !== userIds.length) {
    throw new Error("Some users were not found");
  }

  return res.data as UserProfile[];
}
