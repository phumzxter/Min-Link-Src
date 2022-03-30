// base url
export const BASE_URL = "http://localhost:9000";

//get user
export function getUser() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}
// get token
export function getToken() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }
  return token;
}
// set user session
export function setUserSession(token, user) {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", user);
}
// remove user session
export function removeUserSession() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  return;
}
export function isObjEmpty(obj) {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
