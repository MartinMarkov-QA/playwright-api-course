import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

test.use({ ignoreHTTPSErrors: true });

test('Get Articles', async ({ api }) => {
    api
        .url('https://conduit-api.bondaracademy.com')
        .path('/api/articles')
        .params({ limit: 10, offset: 0 })

    const response = await api.getRequest(200);

    expect(response).toHaveProperty("articles");
    expect(response.articles.length).toBeLessThanOrEqual(10);
});

test('Get Tags', async ({ api }) => {
    api
        .url('https://conduit-api.bondaracademy.com')
        .path('/api/tags')

    const response = await api.getRequest(200);

    expect(response).toHaveProperty("tags");
    expect(response.tags.length).toBeLessThanOrEqual(10);
    expect(response.tags[0]).toEqual("Test");
});