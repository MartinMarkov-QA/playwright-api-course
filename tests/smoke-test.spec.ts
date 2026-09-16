// import { test, expect } from '@playwright/test';
import { test } from '../utils/fixtures';

test.use({ ignoreHTTPSErrors: true });

test('Smoke Test', async ({ api }) => {   
        api
            .url('https://conduit-api.bondaracademy.com')
            .path('/api/tags');

        console.log(api);
});