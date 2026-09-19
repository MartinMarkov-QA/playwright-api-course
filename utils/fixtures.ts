import { test as base } from '@playwright/test';
import { RequestHandler } from './request-handler';

export type TestOptions = {
    api: RequestHandler;
}

export const test = base.extend<TestOptions>({
    api: async ({ request }, use) => {
        const defaultBaseUrl = 'https://conduit-api.bondaracademy.com';
        const requestHandler = new RequestHandler(request, defaultBaseUrl);
        await use(requestHandler);
    }
})