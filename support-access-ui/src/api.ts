import { authContextFromToken } from "@hiiretail/auth-context";

export type CreateSupportCase = {
  tenantId: string;
  accessLevel: string;
  title: string;
  description?: string;
  jiraIssueLinks?: string[];
  assignees: string[];
};

export type SupportCase = {
  id: number;
  tenantId: string;
  status:
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "Expired"
    | "Archived"
    | "Closed";
  closed: boolean;
  title: string;
  description: string;
  accessLevel: string;
  jiraIssueLinks: string[];
  createdBy: {
    id: string;
    type: "user";
  };
  createdAt: string; // Date
  decidedAt: string; // Date
  decidedBy: {
    id: string;
    type: "user";
  };
  assignees: string[];
};

export class SupportCaseAPI {
  private token = "";

  setToken(newToken: string) {
    this.token = newToken;
  }

  async listMySupportCases(): Promise<SupportCase[]> {
    const authCtx = this.getAuthContext();

    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `?userProfileId=${authCtx.requester}`,
      { headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }

    return await res.json();
  }

  async getSupportCaseCredentials(
    caseId: number
  ): Promise<{ username: string; password: string }> {
    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `/${caseId}` +
        `/credentials`,
      { headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }

    return await res.json();
  }

  async createSupportCase(input: CreateSupportCase) {
    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: input.tenantId,
          title: input.title,
          description: input.description,
          accessLevel: input.accessLevel,
          jiraIssueLinks: input.jiraIssueLinks,
          assignees: input.assignees,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }
  }

  async listAllSupportCases(): Promise<SupportCase[]> {
    const authCtx = this.getAuthContext();

    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `?tenantId=${authCtx.tenantId}`,
      { headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }

    return await res.json();
  }

  async acceptSupportCase(caseId: number) {
    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `/${caseId}` +
        `/accept`,
      { method: "POST", headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }
  }

  async rejectSupportCase(caseId: number) {
    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `/${caseId}` +
        `/reject`,
      { method: "POST", headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }
  }

  async closeSupportCase(caseId: number) {
    const res = await fetch(
      "https://developer.hiiretail.com/proxy/" +
        "https://iam-api.retailsvc.com/api/v1/support-cases" +
        `/${caseId}` +
        `/close`,
      { method: "POST", headers: { Authorization: "Bearer " + this.token } }
    );

    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }
  }

  getAuthContext() {
    return authContextFromToken(this.token);
  }
}
