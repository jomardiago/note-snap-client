import { HttpResponse, http } from "msw";

import { LOGIN_RESPONSE, NOTES } from "./dummy-data";

export const handlers = [
  http.post("*/auth/register", () => {
    return HttpResponse.json({
      message: "User registered.",
    });
  }),

  http.post("*/auth/login", () => {
    return HttpResponse.json(LOGIN_RESPONSE, {
      status: 201,
    });
  }),

  http.get("*/notes", () => {
    return HttpResponse.json(NOTES, {
      status: 200,
    });
  }),
];
