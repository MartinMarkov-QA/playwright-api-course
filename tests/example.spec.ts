import { test, expect } from '@playwright/test';
import { log } from 'node:console';

test.use({ ignoreHTTPSErrors: true });

test('Get Tags', async ({ request }) => {
  const responseTags = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsJSON = await responseTags.json();

  expect(responseTags.status()).toBe(200);
});


