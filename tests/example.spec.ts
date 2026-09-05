import { test, expect } from "@playwright/test";

test.use({ ignoreHTTPSErrors: true });

test.describe("Tags API Tests", () => {
  test("Get Tags", async ({ request }) => {
    const responseTags = await request.get("https://conduit-api.bondaracademy.com/api/tags");
    const tagsJSON = await responseTags.json();

    expect(responseTags.status()).toBe(200);
    expect(tagsJSON).toHaveProperty("tags");
    expect(tagsJSON.tags.length).toBeLessThanOrEqual(10);
    expect(tagsJSON.tags[0]).toEqual("Test");
  });
});
