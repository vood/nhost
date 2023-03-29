import {
  TEST_DASHBOARD_URL,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} from '@/e2e/env';
import { test as setup } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/signin');
  await page.getByRole('link', { name: /continue with email/i }).click();

  await page.waitForURL('/signin/email');
  await page.getByLabel('Email').fill(TEST_USER_EMAIL);
  await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForURL(TEST_DASHBOARD_URL);
  await page.context().storageState({ path: authFile });
});
