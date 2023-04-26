import React from "react";
import { getCookie } from "cookies-next";

export const baseUrl = "http://127.0.0.1:8000/api";
const token = getCookie("token");

export const headersConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
};

export const headersConfigWithToken = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};
