import { faker } from '@faker-js/faker';
import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

// Note: These tests should be run every night to ensure that the project
// creation flow is working as expected. Considering that the project creation
// flow is a bit slow, we need to run these tests less frequently.

const PROJECT_CREATION_TIMEOUT = 60 * 1000 * 3.5;

let page: Page;

const fullName = faker.name.fullName();
const email = faker.internet.email();
const password = faker.internet.password();
const projectName = faker.commerce.productName();

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage({ storageState: undefined });

  await page.goto('/');
  await page.getByRole('link', { name: /sign up/i }).click();

  await page.getByRole('textbox', { name: /name/i }).fill(fullName);
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);

  await page.getByRole('button', { name: /^sign up$/i }).click();
  await page.waitForURL('/');
});

test.beforeEach(async () => {
  await page.goto('/');
});

test.afterAll(async () => {
  await page.close();
});

test.skip('should be able to create a new project', async () => {
  await page.getByRole('link', { name: /create your first project/i }).click();

  await page.getByRole('textbox', { name: /project name/i }).fill(projectName);
  await page.getByRole('button', { name: /workspace/i }).click();
  await page.getByRole('option').first().click();

  await page
    .getByRole('radiogroup')
    .getByText(/starter/i)
    .click();

  await page.getByRole('button', { name: /create project/i }).click();

  await expect(
    page.getByText(/the project has been created successfully/i),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: projectName, exact: true }),
  ).toBeVisible({ timeout: PROJECT_CREATION_TIMEOUT });
});

test.skip('should be able to pause the project', async () => {
  await page.getByRole('link', { name: projectName }).click();
  await expect(
    page.getByRole('heading', { name: projectName, exact: true }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: /main navigation/i })
    .getByRole('link', { name: /settings/i })
    .click();
  await page.getByRole('button', { name: /pause/i }).click();
  await page.getByRole('button', { name: /confirm/i }).click();

  await page.waitForURL('/');
  await expect(page.getByText(/^pausing$/i)).toBeVisible();
});

// TODO
test.skip('should be able to wake up the project', () => {});

// TODO
test.skip('should be able to upgrade the project to pro', () => {});

// TODO
test.skip('should be able to delete the project', () => {});
