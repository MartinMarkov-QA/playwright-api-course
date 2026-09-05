import { test, expect } from "@playwright/test";

test.use({ ignoreHTTPSErrors: true });

test.describe("Tags and Articles API Tests", () => {
  test("Get Tags", async ({ request }) => {
    const responseTags = await request.get("https://conduit-api.bondaracademy.com/api/tags");
    const tagsJSON = await responseTags.json();

    expect(responseTags.status()).toBe(200);
    expect(tagsJSON).toHaveProperty("tags");
    expect(tagsJSON.tags.length).toBeLessThanOrEqual(10);
    expect(tagsJSON.tags[0]).toEqual("Test");
  });

  test("Get Articles", async ({ request }) => {
    const responseArticles = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0");
    const articlesJSON = await responseArticles.json();

    expect(responseArticles.status()).toBe(200);
    expect(articlesJSON).toHaveProperty("articles");
    expect(articlesJSON.articles.length).toBeLessThanOrEqual(10);
    expect(articlesJSON.articles[0]).toHaveProperty("slug");
    expect(articlesJSON.articles[0]).toHaveProperty("title");
    expect(articlesJSON.articles[0]).toHaveProperty("description");
    expect(articlesJSON.articles[0]).toHaveProperty("body");
    expect(articlesJSON.articles[0]).toHaveProperty("tagList");
    expect(articlesJSON.articles[0]).toHaveProperty("createdAt");
    expect(articlesJSON.articles[0]).toHaveProperty("updatedAt");
    expect(articlesJSON.articles[0]).toHaveProperty("favorited");
    expect(articlesJSON.articles[0]).toHaveProperty("favoritesCount");
    expect(articlesJSON.articles[0]).toHaveProperty("author");
  });
});
