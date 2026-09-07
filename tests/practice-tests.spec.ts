import { test, expect } from "@playwright/test";

test.use({ ignoreHTTPSErrors: true });

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

test("Create And Delete Article", async ({ request }) => {
  const userLoginTokenResponse = await request.post("https://conduit-api.bondaracademy.com/api/users/login", {
    data: {
      user: {
        email: "mar7inim@gmail.com",
        password: "@mar7inim@"
      }
    }
  });

  const userLoginTokenResJSON = await userLoginTokenResponse.json();
  const userAuthToken = userLoginTokenResJSON.user.token;

  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles", {
    data: {
      article: { 
        title: "Test API Article - one", 
        description: "Article about section - one", 
        body: "Article body section - one", 
        tagList: ["JS", "API", "Test"] 
      }
    },
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });

  const newArticleResponseJSON = await newArticleResponse.json();
  const slugId = newArticleResponseJSON.article.slug;

  expect(newArticleResponse.status()).toBe(201);

  const responseArticles = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });
  const responseArticlesJSON = await responseArticles.json();

  expect(responseArticles.status()).toBe(200);
  expect(responseArticlesJSON.articles[0].title).toEqual("Test API Article - one");

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });

  expect(deleteArticleResponse.status()).toBe(204);

});

test("Create, Update And Delete Article", async ({ request }) => {
  const userLoginTokenResponse = await request.post("https://conduit-api.bondaracademy.com/api/users/login", {
    data: {
      user: {
        email: "mar7inim@gmail.com",
        password: "@mar7inim@"
      }
    }
  });

  const userLoginTokenResJSON = await userLoginTokenResponse.json();
  const userAuthToken = userLoginTokenResJSON.user.token;

  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles", {
    data: {
      article: { 
        title: "Test API Article - one", 
        description: "Article about section - one", 
        body: "Article body section - one", 
        tagList: ["JS", "API", "Test"] 
      }
    },
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });

  const newArticleResponseJSON = await newArticleResponse.json();
  const newArticleSlugId = newArticleResponseJSON.article.slug;

  expect(newArticleResponse.status()).toBe(201);

  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${newArticleSlugId}`, {
    data: {
      article: { 
        title: "Test API Article - one UPDATED", 
        description: "Article about section - one", 
        body: "Article body section - one", 
        tagList: ["JS", "API", "Test"] 
      }
    },
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });
  
  const updateArticleResponseJSON = await updateArticleResponse.json();
  const UpdatedArticleSlugId = updateArticleResponseJSON.article.slug;

  expect(updateArticleResponse.status()).toBe(200);

  const responseArticles = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });

  const responseArticlesJSON = await responseArticles.json();

  expect(responseArticles.status()).toBe(200);
  expect(responseArticlesJSON.articles[0].title).toEqual("Test API Article - one UPDATED");

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${UpdatedArticleSlugId}`, {
    headers: {
      Authorization: `Token ${userAuthToken}`
    }
  });

  expect(deleteArticleResponse.status()).toBe(204);

});
