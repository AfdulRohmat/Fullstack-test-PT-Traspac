import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

// return Token cookie if exists otherwise return empty string
export const checkTokenFromCookie = () => {
  const token = hasCookie("token");
  return token;
};

// set Token cookie value
export const setTokenCookie = (value: string) => {
  setCookie("token", value);
};

// delete the Token cookie
export const logoutUser = () => {
  deleteCookie("token");
};
