import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

test.use({ ignoreHTTPSErrors: true });

test('Smoke Test', async ({ api, request }) => {   
        api
            .url('https://conduit-api.bondaracademy.com')
            .path('/api/articles')
            .params({ limit: 10, offset: 0})

        const response = await api.getRequest();
        
        expect(response.status()).toBe(200);
});