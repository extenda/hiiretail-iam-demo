import { TokenCache } from './getTokenCache';

export async function saveTokenCache(
  businessUnitId: string,
  operatorId: string,
  pin: string,
  idToken: string,
  refreshToken?: string,
): Promise<TokenCache> {
  const res = await fetch(`/token-cache-api/v1/businessUnits/${businessUnitId}/oauth/token`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      operatorId,
      pin,
      idToken,
      refreshToken,
    }),
  });

  if (res.status === 200) {
    return res.json();
  }

  // Usually in production you would need to
  // ignore errors from Token Cache API, as you do not want to
  // cache service to block user login flow.
  // Probably you can log errors as warning to you monitoring system
  // For Demo purposes we will not ignore error, and show it to the UI

  throw new Error(`Token Cache API error ${res.statusText} ${await res.text()}`);
}
