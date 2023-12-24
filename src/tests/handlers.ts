import { HttpResponse, http } from "msw";

import { LOGIN_RESPONSE } from "./dummy-data";

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
];
