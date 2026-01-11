
vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");

  return {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
        get: vi.fn(),
        post: vi.fn().mockResolvedValue({
          data: { token: "abc123" },
        }),
      })),
    },
  };
});
import { describe, it, expect, vi } from 'vitest';
import { authService } from "../services/getData";

describe("Auth Service", () => {
  it("should login successfully", async () => {
    const response = await authService.login(
      "test@example.com",
      "password"
    );

    expect(response.data.token).toBe("abc123");
  })
});