import { describe, expect, it } from "vitest";

import { API_METHODS } from "@/shared/config";

import { createGreenApiClient } from "./api-client";

describe("createGreenApiClient", () => {
  it("builds method paths with dynamic credentials", () => {
    const client = createGreenApiClient({
      idInstance: "1234567890",
      apiTokenInstance: "secret-token",
    });

    expect(client.methodPath(API_METHODS.sendMessage)).toBe(
      "/waInstance1234567890/SendMessage/secret-token",
    );
    expect(client.deleteNotificationPath(42)).toBe(
      "/waInstance1234567890/DeleteNotification/secret-token/42",
    );
  });
});
