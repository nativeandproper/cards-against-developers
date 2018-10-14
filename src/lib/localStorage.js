export const jwtDecode = (t) => {
  if (t === null) return null;

  let token = {};
  token.raw = t;
  const tokenSplit = t.split(".");

  if (tokenSplit.length < 1) return null;

  const payloadBase64Url = tokenSplit[1];
  const payloadBase64 = payloadBase64Url.replace("-", "+").replace("_", "/");
  token.payload = JSON.parse(window.atob(payloadBase64));

  return token;
};