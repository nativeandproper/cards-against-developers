import env from "../config/development";

const defaultHeaders = {
  "Content-Type": "application/json"
};

export default function api(method, url, data, opts = {}) {
  const token = localStorage.getItem("cah-token");

  if (token) {
    defaultHeaders.Authorization = token;
  }

  return fetch(`${env.API_ROOT}${url}`, {
    body: JSON.stringify(data),
    // TODO: include session token for api token for requests
    credentials: "include",
    headers: defaultHeaders,
    method: method.toUpperCase()
  }).then(res => {
    // return response so headers can be accessed
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
