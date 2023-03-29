import { test as teardown } from '@playwright/test';
import {
  TEST_PROJECT_ADMIN_SECRET,
  TEST_PROJECT_NAME,
  TEST_PROJECT_SLUG,
  TEST_WORKSPACE_SLUG,
} from './env';
import { openProject } from './utils';

teardown('teardown database', async ({ page, context }) => {
  await page.goto('/');

  await openProject({
    page,
    projectName: TEST_PROJECT_NAME,
    workspaceSlug: TEST_WORKSPACE_SLUG,
    projectSlug: TEST_PROJECT_SLUG,
  });

  const pagePromise = context.waitForEvent('page');

  await page.getByRole('link', { name: /hasura/i }).click();
  await page.getByRole('link', { name: /open hasura/i }).click();

  const hasuraPage = await pagePromise;
  await hasuraPage.waitForLoadState();

  const adminSecretInput = hasuraPage.getByPlaceholder(/enter admin-secret/i);

  // note: a more ideal way would be to paste from clipboard, but Playwright
  // doesn't support that yet
  await adminSecretInput.fill(TEST_PROJECT_ADMIN_SECRET);
  await adminSecretInput.press('Enter');

  // note: getByRole doesn't work here
  await hasuraPage.locator('a', { hasText: /data/i }).click();
  await hasuraPage.getByRole('link', { name: /sql/i }).click();

  await hasuraPage.getByRole('textbox').fill(`
DO $$ DECLARE
  tablename text;
BEGIN
  FOR tablename IN
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
  LOOP
    EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(tablename) || ' CASCADE';
  END LOOP;
END $$;
`);

  await hasuraPage.getByRole('button', { name: /run!/i }).click();
  await hasuraPage.getByText(/sql executed!/i).waitFor();
});
