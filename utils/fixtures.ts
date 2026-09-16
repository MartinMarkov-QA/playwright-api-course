import {test as base} from '@playwright/test';
import { RequestHandler } from './request-handler';

export type Requests = {
    api: RequestHandler;
}

export const test = base.extend<Requests>({

    api: async ({}, use) => {
        const requestHandler = new RequestHandler();
        await use(requestHandler);
    }
})