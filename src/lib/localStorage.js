export const jwtDecode = (t) => {
  let token = {};
  token.raw = t;
  const tokenSplit = t.split(".");
  const payloadBase64Url = tokenSplit[1];
  const payloadBase64 = payloadBase64Url.replace("-", "+").replace("_", "/");

  token.payload = JSON.parse(window.atob(payloadBase64));

  return token;
};