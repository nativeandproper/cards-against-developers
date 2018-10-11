import env from "../config/development";

const defaultHeaders = {
  // Accept: "application/json",
  "Content-Type": "application/json"
};

export default function api(method, url, data, opts = null) {
  return fetch(`${env.API_ROOT}${url}`, {
    body: JSON.stringify(data),
    // TODO: use session token auth for user requests and api token for api requests
    credentials: "include",
    headers: defaultHeaders,
    method: method.toUpperCase()
  }).then(res => {
    // return full response
    if (opts.fullRes && res.ok) {
      return res;
    }

    const contentType = res.headers.get("content-type");
    if (contentType && res.ok) {
      switch (contentType) {
        case "text/plain":
          return res.text();
        default:
          return res.json();
      }
    }
    return Promise.reject(res);
  });
}
