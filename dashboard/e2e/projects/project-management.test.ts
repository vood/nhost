import { faker } from '@faker-js/faker';
import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage({ storageState: undefined });
});

test.beforeEach(async () => {
  await page.goto('/');
  await page.waitForURL('/signin');
  await page.getByRole('link', { name: /sign up/i }).click();

  await page
    .getByRole('textbox', { name: /name/i })
    .fill(faker.name.fullName());
  await page
    .getByRole('textbox', { name: /email/i })
    .fill(faker.internet.email());
  await page
    .getByRole('textbox', { name: /password/i })
    .fill(faker.internet.password());

  await page.getByRole('button', { name: /^sign up$/i }).click();
  await page.waitForURL('/');
});

test.afterAll(async () => {
  await page.getByRole('banner').getByRole('button').last().click();

  await page.close();
});

test.skip('should be able to create a new project', async () => {
  await page
    .getByRole('link', { name: /create your first project/i })
    .click({ delay: 1000 });
});
