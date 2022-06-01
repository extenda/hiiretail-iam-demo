export type TokenCache = {
  idToken: string;
  offlineToken: string;
};

export async function getTokenCache(
  businessUnitId: string,
  operatorId: string,
  pin: string,
): Promise<TokenCache | null> {
  const body = new URLSearchParams({ operatorId, pin });

  const res = await fetch(`/token-cache-api/v1/businessUnits/${businessUnitId}/oauth/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: body.toString(),
  });

  if (res.status === 200) {
    return res.json();
  }

  // 401 - pin code is invalid, or no cache ws found

  if (res.status === 401) {
    return null;
  }

  // Usually in production you would need to
  // ignore errors from Token Cache API, as you do not want to
  // cache service to block user login flow.
  // Probably you can log errors as warning to you monitoring system
  // For Demo purposes we will not ignore error, and show it to the UI

  throw new Error(`Token Cache API error ${res.statusText} ${await res.text()}`);
}
