import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

const parseCookies = (req) => {
  const list = {};
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) return list;

  //The cookieHeader.split(';') splits the cookie header string into an array of individual
  //cookie strings. Each cookie string is in the format name=value.
  //The forEach method iterates over each cookie string.

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    list[name.trim()] = decodeURIComponent(rest.join("="));
  });

  return list;
};

export const verifyToken = (req, res, next) => {
  const cookies = parseCookies(req);
  const token = cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
