export type TokenCache = {
  idToken: string;
  offlineToken: string;
};

export const getTokenCache = async (
  businessUnitId: string,
  operatorId: string,
  pin: string,
): Promise<TokenCache | null> => {
  const res = await fetch(
    `http://localhost:3000/api/v1/businessUnits/${businessUnitId}/oauth/token`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${process.env.REACT_APP_OCMS_TOKEN}`,
      },
      method: 'POST',
      body: `operatorId=${operatorId}&pin=${pin}`,
    },
  );

  if (res.status === 401) {
    return null;
  }
  return res.json();
};
